namespace EFCoreWebApi.Models;

public class Restaurant
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;

    public int? UserId { get; set; }
    public User? User { get; set; }

    public ICollection<FoodItem> FoodItems { get; set; } = new List<FoodItem>();
}
