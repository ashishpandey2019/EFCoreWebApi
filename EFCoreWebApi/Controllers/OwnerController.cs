using EFCoreWebApi.Data;
using EFCoreWebApi.DTOs;
using EFCoreWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFCoreWebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "RestaurantOwner")]
public class OwnerController : ControllerBase
{
    private readonly AppDbContext _context;
    public OwnerController(AppDbContext context) => _context = context;

    [HttpPut("orders/{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, UpdateOrderStatusDto dto)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.FoodItem)
            .ThenInclude(fi => fi.Restaurant)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound();

        var username = User.Identity?.Name;
        var owner = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (owner == null) return Unauthorized();

        var ownsRestaurant = order.OrderItems.Any(oi => oi.FoodItem.Restaurant?.UserId == owner.Id);
        if (!ownsRestaurant) return Forbid();

        var validStatuses = new[] { "Pending", "Confirmed", "Delivered", "Cancelled" };
        if (!validStatuses.Contains(dto.Status))
            return BadRequest("Invalid status");

        order.Status = dto.Status;
        await _context.SaveChangesAsync();

        return Ok(new { order.Id, order.Status });
    }
}
