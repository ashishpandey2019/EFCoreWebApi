import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService, Order } from '../services/order.service';
import { AuthService, AuthResponse } from '../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  currentUser: AuthResponse | null = null;
  isAdmin = false;
  isDeliveryPartner = false;
  isCustomer = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe((user: AuthResponse | null) => {
      this.currentUser = user;
      this.isAdmin = user?.role === 'Admin' || false;
      this.isDeliveryPartner = user?.role === 'DeliveryPartner' || false;
      this.isCustomer = user?.role === 'Customer' || false;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    if (this.isAdmin || this.isDeliveryPartner || this.isCustomer) {
      this.loadOrders();
    }
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  cancelOrder(id: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(id).subscribe({
        next: () => {
          this.loadOrders();
          alert('Order cancelled successfully');
        },
        error: (error: any) => {
          alert('Failed to cancel order: ' + (error.error?.message || 'Unknown error'));
        }
      });
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getStatusClass(status: string): string {
    const lowerStatus = status?.toLowerCase() || 'pending';
    return `status-${lowerStatus}`;
  }
}
