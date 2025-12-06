import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, Cart, CartItem } from '../services/cart.service';
import { FoodItemService } from '../services/food-item.service';
import { OrderService, CreateOrderDto, OrderItem } from '../services/order.service';
import { AuthService, AuthResponse } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  isLoading = true;
  isCheckingOut = false;
  deliveryAddress = '';
  deliveryFee = 5.00;
  isCustomer = false;
  currentUser: AuthResponse | null = null;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe((user: AuthResponse | null) => {
      this.currentUser = user;
      this.isCustomer = user?.role === 'Customer' || false;
      if (!this.isCustomer) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    if (this.isCustomer) {
      this.loadCart();
    }
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (data: Cart) => {
        this.cart = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getSubtotal(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((total, item) => {
      return total + (item.foodItem?.price * item.quantity || 0);
    }, 0);
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.updateQuantity(item);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  updateQuantity(item: CartItem): void {
    this.cartService.updateCartItem(item.id, item.quantity).subscribe({
      error: () => this.loadCart()
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id).subscribe({
      next: () => this.loadCart()
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  checkout(): void {
    if (!this.cart || !this.deliveryAddress) return;

    this.isCheckingOut = true;
    const orderItems: OrderItem[] = this.cart.items.map(item => ({
      foodItemId: item.foodItemId,
      quantity: item.quantity,
      price: item.foodItem?.price || 0
    }));

    const orderDto: CreateOrderDto = {
      items: orderItems,
      deliveryAddress: this.deliveryAddress
    };

    this.orderService.createOrder(orderDto).subscribe({
      next: () => {
        this.isCheckingOut = false;
        alert('Order placed successfully!');
        this.router.navigate(['/orders']);
      },
      error: (error: any) => {
        this.isCheckingOut = false;
        alert('Order failed: ' + (error.error?.message || 'Unknown error'));
      }
    });
  }
}
