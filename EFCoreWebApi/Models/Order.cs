﻿namespace EFCoreWebApi.Models;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Pending";

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
