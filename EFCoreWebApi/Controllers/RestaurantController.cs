using EFCoreWebApi.Data;
using EFCoreWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFCoreWebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RestaurantController : ControllerBase
{
    private readonly AppDbContext _context;

    public RestaurantController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Restaurant>>> GetAll(
    string? search = null,
    int page = 1,
    int pageSize = 10)
    {
        var query = _context.Restaurants.Include(r => r.FoodItems).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(r => r.Name.Contains(search) || r.Address.Contains(search));

        var totalCount = await query.CountAsync();

        var restaurants = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new
        {
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            Data = restaurants
        });
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Restaurant>> GetById(int id)
    {
        var restaurant = await _context.Restaurants
            .Include(r => r.FoodItems)
            .FirstOrDefaultAsync(r => r.Id == id);

        return restaurant == null ? NotFound() : Ok(restaurant);
    }

    [Authorize(Roles = "Admin,RestaurantOwner")]
    [HttpPost]
    public async Task<ActionResult<Restaurant>> Create(Restaurant restaurant)
    {
        var username = User.Identity?.Name;

        var owner = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (owner == null) return Unauthorized();

        // RestaurantOwner can only create a restaurant for themselves
        if (User.IsInRole("RestaurantOwner"))
            restaurant.UserId = owner.Id;

        _context.Restaurants.Add(restaurant);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = restaurant.Id }, restaurant);
    }

    [Authorize(Roles = "Admin,RestaurantOwner")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Restaurant restaurant)
    {
        if (id != restaurant.Id)
            return BadRequest("Restaurant ID mismatch");

        var existing = await _context.Restaurants.FirstOrDefaultAsync(r => r.Id == id);
        if (existing == null)
            return NotFound();

        var username = User.Identity?.Name;

        if (User.IsInRole("RestaurantOwner"))
        {
            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (owner == null || existing.UserId != owner.Id)
                return Forbid("You can only update your own restaurant.");
        }

        existing.Name = restaurant.Name;
        existing.Address = restaurant.Address;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize(Roles = "Admin,RestaurantOwner")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.Id == id);
        if (restaurant == null) return NotFound();

        var username = User.Identity?.Name;

        if (User.IsInRole("RestaurantOwner"))
        {
            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (owner == null || restaurant.UserId != owner.Id)
                return Forbid("You can only delete your own restaurant.");
        }

        _context.Restaurants.Remove(restaurant);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
