using EFCoreWebApi.Data;
using EFCoreWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFCoreWebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Customer")]
public class CartController : ControllerBase
{
    private readonly AppDbContext _context;

    public CartController(AppDbContext context)
    {
        _context = context;
    }

    private async Task<User?> GetCurrentUser() =>
        await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity!.Name);

    [HttpGet]
    public async Task<ActionResult<Cart>> GetCart()
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();

        var cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(ci => ci.FoodItem)
            .FirstOrDefaultAsync(c => c.UserId == user.Id);

        if (cart == null)
        {
            cart = new Cart { UserId = user.Id };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return Ok(cart);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToCart(int foodItemId, int quantity)
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();

        var foodItem = await _context.FoodItems.FindAsync(foodItemId);
        if (foodItem == null) return NotFound("Food item not found");

        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == user.Id);

        if (cart == null)
        {
            cart = new Cart { UserId = user.Id };
            _context.Carts.Add(cart);
        }

        var existingItem = cart.Items.FirstOrDefault(i => i.FoodItemId == foodItemId);
        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            cart.Items.Add(new CartItem
            {
                FoodItemId = foodItemId,
                Quantity = quantity
            });
        }

        await _context.SaveChangesAsync();
        return Ok("Item added to cart");
    }

    [HttpDelete("remove/{itemId}")]
    public async Task<IActionResult> RemoveFromCart(int itemId)
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();

        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == user.Id);

        if (cart == null) return NotFound("Cart not found");

        var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
        if (item == null) return NotFound("Item not found in cart");

        cart.Items.Remove(item);
        await _context.SaveChangesAsync();
        return Ok("Item removed");
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout()
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();

        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == user.Id);

        if (cart == null || !cart.Items.Any())
            return BadRequest("Cart is empty");

        var order = new Order
        {
            UserId = user.Id,
            OrderItems = cart.Items.Select(ci => new OrderItem
            {
                FoodItemId = ci.FoodItemId,
                Quantity = ci.Quantity
            }).ToList()
        };

        _context.Orders.Add(order);
        _context.CartItems.RemoveRange(cart.Items); // clear cart
        await _context.SaveChangesAsync();

        return Ok(new { order.Id, Message = "Order placed successfully" });
    }
}

