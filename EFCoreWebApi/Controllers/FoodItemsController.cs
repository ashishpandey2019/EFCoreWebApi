using EFCoreWebApi.Data;
using EFCoreWebApi.DTOs;
using EFCoreWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EFCoreWebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodItemsController : ControllerBase
{
    private readonly AppDbContext _context;

    public FoodItemsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FoodItem>>> GetAll()
    {
        return await _context.FoodItems.Include(f => f.Restaurant).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FoodItem>> GetById(int id)
    {
        var item = await _context.FoodItems.Include(f => f.Restaurant).FirstOrDefaultAsync(f => f.Id == id);
        return item == null ? NotFound() : item;
    }

    [Authorize(Roles = "Admin,RestaurantOwner")]
    [HttpPost]
    public async Task<ActionResult<FoodItem>> Create(FoodItemCreateDto dto)
    {
        var username = User.Identity?.Name;

        var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.Id == dto.RestaurantId);

        if (restaurant == null)
            return BadRequest("Restaurant not found.");

        if (User.IsInRole("RestaurantOwner") && restaurant.User?.Username != username)
            return Forbid("You can only add food items to your own restaurant.");

        var item = new FoodItem
        {
            Name = dto.Name,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            Price = dto.Price,
            AvailableQuantity = dto.AvailableQuantity,
            RestaurantId = dto.RestaurantId
        };

        _context.FoodItems.Add(item);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [Authorize(Roles = "Admin,RestaurantOwner")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, FoodItemCreateDto dto)
    {
        var item = await _context.FoodItems.Include(f => f.Restaurant).FirstOrDefaultAsync(f => f.Id == id);
        if (item == null) return NotFound();

        var username = User.Identity?.Name;

        if (User.IsInRole("RestaurantOwner") && item.Restaurant?.User?.Username != username)
            return Forbid("You can only edit your own restaurant's items.");

        item.Name = dto.Name;
        item.Description = dto.Description;
        item.ImageUrl = dto.ImageUrl;
        item.Price = dto.Price;
        item.AvailableQuantity = dto.AvailableQuantity;
        item.RestaurantId = dto.RestaurantId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.FoodItems.FindAsync(id);
        if (item == null) return NotFound();

        _context.FoodItems.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
