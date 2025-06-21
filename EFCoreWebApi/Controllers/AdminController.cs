using EFCoreWebApi.Data;
using EFCoreWebApi.DTOs;
using EFCoreWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFCoreWebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;
    public AdminController(AppDbContext context) => _context = context;

    [HttpPut("orders/{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, UpdateOrderStatusDto dto)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();

        var validStatuses = new[] { "Pending", "Confirmed", "Delivered", "Cancelled" };
        if (!validStatuses.Contains(dto.Status))
            return BadRequest("Invalid status. Allowed: Pending, Confirmed, Delivered, Cancelled");

        order.Status = dto.Status;
        await _context.SaveChangesAsync();

        return Ok(new { order.Id, order.Status });
    }
}
