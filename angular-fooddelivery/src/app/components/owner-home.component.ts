import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.scss']
})
export class OwnerHomeComponent implements OnInit {
  restaurant: any;
  todayOrders: any[] = [];
  topItems: any[] = [];
  stats: any = {
    totalOrders: 0,
    revenue: 0,
    averageRating: 0,
    activeMenuItems: 0
  };
  showMenuModal: boolean = false;
  newMenuItem: any = {
    name: '',
    category: '',
    price: 0,
    description: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.loadRestaurantData();
  }

  loadRestaurantData(): void {
    // Mock data - replace with actual API call
    this.restaurant = {
      id: 1,
      name: 'Pizza Palace',
      category: 'Italian',
      rating: 4.5,
      status: 'Open',
      deliveryTime: '30-40 min'
    };

    this.todayOrders = [
      { id: 101, customerName: 'John Doe', items: 3, total: '$35.50', time: '10:30 AM', status: 'Preparing' },
      { id: 102, customerName: 'Jane Smith', items: 2, total: '$22.00', time: '10:45 AM', status: 'Ready' },
      { id: 103, customerName: 'Bob Johnson', items: 4, total: '$48.75', time: '11:00 AM', status: 'Preparing' },
      { id: 104, customerName: 'Alice Brown', items: 1, total: '$12.99', time: '11:15 AM', status: 'Pending' }
    ];

    this.topItems = [
      { name: 'Margherita Pizza', sold: 45, revenue: '$225' },
      { name: 'Pepperoni Pizza', sold: 38, revenue: '$190' },
      { name: 'Caesar Salad', sold: 25, revenue: '$100' }
    ];

    this.stats = {
      totalOrders: 156,
      revenue: '$3,240.50',
      averageRating: 4.5,
      activeMenuItems: 24
    };
  }

  openMenuModal(): void {
    this.showMenuModal = true;
  }

  closeMenuModal(): void {
    this.showMenuModal = false;
    this.resetNewMenuItem();
  }

  resetNewMenuItem(): void {
    this.newMenuItem = {
      name: '',
      category: '',
      price: 0,
      description: ''
    };
  }

  addMenuItem(): void {
    if (this.newMenuItem.name && this.newMenuItem.price > 0) {
      console.log('Menu item added:', this.newMenuItem);
      this.closeMenuModal();
    }
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    const order = this.todayOrders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    }
  }

  toggleRestaurantStatus(): void {
    this.restaurant.status = this.restaurant.status === 'Open' ? 'Closed' : 'Open';
    console.log('Restaurant status changed to:', this.restaurant.status);
  }
}
