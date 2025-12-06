import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  adminStats: any = {
    totalUsers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    platformRevenue: 0
  };
  recentOrders: any[] = [];
  users: any[] = [];
  restaurants: any[] = [];
  selectedTab: string = 'overview';
  searchTerm: string = '';
  filterStatus: string = 'all';

  constructor() { }

  ngOnInit(): void {
    this.loadAdminData();
  }

  loadAdminData(): void {
    // Mock data - replace with actual API call
    this.adminStats = {
      totalUsers: 1542,
      totalRestaurants: 287,
      totalOrders: 45230,
      platformRevenue: '$125,340.50'
    };

    this.recentOrders = [
      { id: 5001, customer: 'John Doe', restaurant: 'Pizza Palace', amount: '$35.50', date: '2024-12-06', status: 'Delivered' },
      { id: 5002, customer: 'Jane Smith', restaurant: 'Dragon House', amount: '$28.00', date: '2024-12-06', status: 'Delivered' },
      { id: 5003, customer: 'Bob Johnson', restaurant: 'Spice Route', amount: '$42.75', date: '2024-12-06', status: 'In Transit' },
      { id: 5004, customer: 'Alice Brown', restaurant: 'Taco Fiesta', amount: '$15.99', date: '2024-12-05', status: 'Delivered' },
      { id: 5005, customer: 'Charlie Wilson', restaurant: 'Burger Barn', amount: '$12.50', date: '2024-12-05', status: 'Cancelled' }
    ];

    this.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joinDate: '2024-01-15', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'RestaurantOwner', joinDate: '2024-02-20', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', joinDate: '2024-03-10', status: 'Inactive' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Customer', joinDate: '2024-04-05', status: 'Active' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'RestaurantOwner', joinDate: '2024-05-12', status: 'Active' }
    ];

    this.restaurants = [
      { id: 1, name: 'Pizza Palace', owner: 'Jane Smith', category: 'Italian', rating: 4.5, status: 'Active', joinDate: '2024-02-20' },
      { id: 2, name: 'Dragon House', owner: 'Charlie Wilson', category: 'Chinese', rating: 4.2, status: 'Active', joinDate: '2024-05-12' },
      { id: 3, name: 'Spice Route', owner: 'Priya Patel', category: 'Indian', rating: 4.7, status: 'Suspended', joinDate: '2024-03-01' },
      { id: 4, name: 'Taco Fiesta', owner: 'Maria Garcia', category: 'Mexican', rating: 4.3, status: 'Active', joinDate: '2024-04-15' },
      { id: 5, name: 'Burger Barn', owner: 'Mike Johnson', category: 'Fast Food', rating: 4.0, status: 'Active', joinDate: '2024-06-01' }
    ];
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  suspendUser(userId: number): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'Active' ? 'Suspended' : 'Active';
      console.log(`User ${userId} status changed to ${user.status}`);
    }
  }

  suspendRestaurant(restaurantId: number): void {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.status = restaurant.status === 'Active' ? 'Suspended' : 'Active';
      console.log(`Restaurant ${restaurantId} status changed to ${restaurant.status}`);
    }
  }

  deleteUser(userId: number): void {
    const index = this.users.findIndex(u => u.id === userId);
    if (index > -1) {
      this.users.splice(index, 1);
      console.log(`User ${userId} deleted`);
    }
  }

  deleteRestaurant(restaurantId: number): void {
    const index = this.restaurants.findIndex(r => r.id === restaurantId);
    if (index > -1) {
      this.restaurants.splice(index, 1);
      console.log(`Restaurant ${restaurantId} deleted`);
    }
  }

  getOrderStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  filterUsers(): any[] {
    return this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'all' || user.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

  filterRestaurants(): any[] {
    return this.restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'all' || restaurant.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }
}
