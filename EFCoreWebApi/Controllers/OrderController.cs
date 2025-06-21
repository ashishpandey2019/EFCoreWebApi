using EFCoreWebApi.Data;
using EFCoreWebApi.DTOs;
using EFCoreWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFCoreWebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Customer")]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrderController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderDto orderDto)
    {
        var username = User.Identity?.Name;

        var validIds = await _context.FoodItems.Select(f => f.Id).ToListAsync();
        if (orderDto.Items.Any(i => !validIds.Contains(i.FoodItemId)))
            return BadRequest("One or more food items are invalid.");


        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null) return Unauthorized();

        var order = new Order
        {
            UserId = user.Id,
            OrderItems = orderDto.Items.Select(i => new OrderItem
            {
                FoodItemId = i.FoodItemId,
                Quantity = i.Quantity
            }).ToList()
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        var total = await _context.FoodItems
                    .Where(f => orderDto.Items.Select(i => i.FoodItemId).Contains(f.Id))
                    .ToDictionaryAsync(f => f.Id, f => f.Price);

        var totalAmount = orderDto.Items.Sum(i => i.Quantity * total[i.FoodItemId]);


        return Ok(new { order.Id, TotalAmount = totalAmount, Message = "Order placed successfully" });

    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetUserOrders()
    {
        var username = User.Identity?.Name;
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null) return Unauthorized();

        var orders = await _context.Orders
            .Where(o => o.UserId == user.Id)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.FoodItem)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderById(int id)
    {
        var username = User.Identity?.Name;
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null) return Unauthorized();

        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.FoodItem)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == user.Id);

        return order == null ? NotFound() : Ok(order);
    }
}
