import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './owner-orders.component.html',
  styleUrls: ['./owner-orders.component.scss']
})
export class OwnerOrdersComponent implements OnInit {
  allOrders: any[] = [];
  filteredOrders: any[] = [];
  filterStatus: string = 'all';

  constructor() { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.allOrders = [
      { id: 101, customer: 'John Doe', items: 3, total: '$35.50', date: '2024-12-06', time: '10:30 AM', status: 'Preparing', items_list: ['Margherita Pizza', 'Caesar Salad', 'Garlic Bread'] },
      { id: 102, customer: 'Jane Smith', items: 2, total: '$22.00', date: '2024-12-06', time: '10:45 AM', status: 'Ready', items_list: ['Pepperoni Pizza', 'Beverage'] },
      { id: 103, customer: 'Bob Johnson', items: 4, total: '$48.75', date: '2024-12-06', time: '11:00 AM', status: 'Delivered', items_list: ['2x Pizza', 'Salad', 'Garlic Bread'] },
      { id: 104, customer: 'Alice Brown', items: 1, total: '$12.99', date: '2024-12-06', time: '11:15 AM', status: 'Pending', items_list: ['Margherita Pizza'] },
      { id: 105, customer: 'Charlie Wilson', items: 5, total: '$68.50', date: '2024-12-05', time: '08:30 PM', status: 'Delivered', items_list: ['3x Pizza', 'Salad', '2x Beverages'] },
      { id: 106, customer: 'Diana Martin', items: 2, total: '$19.98', date: '2024-12-05', time: '07:45 PM', status: 'Cancelled', items_list: ['Pizza', 'Dessert'] }
    ];
    this.filterOrders();
  }

  filterOrders(): void {
    if (this.filterStatus === 'all') {
      this.filteredOrders = this.allOrders;
    } else {
      this.filteredOrders = this.allOrders.filter(order => order.status === this.filterStatus);
    }
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    const order = this.allOrders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.filterOrders();
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    }
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'Pending': '#ff9800',
      'Preparing': '#2196f3',
      'Ready': '#4caf50',
      'Delivered': '#8bc34a',
      'Cancelled': '#f44336'
    };
    return colors[status] || '#999';
  }
}
