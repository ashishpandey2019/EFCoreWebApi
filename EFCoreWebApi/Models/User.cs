﻿namespace EFCoreWebApi.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "Customer"; // "Admin", "RestaurantOwner"

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
