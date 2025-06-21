using System.ComponentModel.DataAnnotations;

namespace EFCoreWebApi.DTOs;

public class AuthRequest
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    [StringLength(15, MinimumLength = 6, ErrorMessage = "Password must be at least 6 and max 15 characters.")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;
}
