﻿namespace EFCoreWebApi.DTOs;

public class CreateOrderDto
{
    public List<OrderItemDto> Items { get; set; } = new();
}
