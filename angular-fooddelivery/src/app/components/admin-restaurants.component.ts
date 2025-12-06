import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-restaurants',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.scss']
})
export class AdminRestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchTerm: string = '';
  filterStatus: string = 'all';

  constructor() { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurants = [
      { id: 1, name: 'Pizza Palace', owner: 'Jane Smith', category: 'Italian', phone: '555-1001', email: 'pizza@example.com', rating: 4.5, joinDate: '2024-02-20', status: 'Active', orders: 145 },
      { id: 2, name: 'Dragon House', owner: 'Charlie Wilson', category: 'Chinese', phone: '555-1002', email: 'dragon@example.com', rating: 4.2, joinDate: '2024-05-12', status: 'Active', orders: 89 },
      { id: 3, name: 'Spice Route', owner: 'Priya Patel', category: 'Indian', phone: '555-1003', email: 'spice@example.com', rating: 4.7, joinDate: '2024-03-01', status: 'Suspended', orders: 234 },
      { id: 4, name: 'Taco Fiesta', owner: 'Maria Garcia', category: 'Mexican', phone: '555-1004', email: 'taco@example.com', rating: 4.3, joinDate: '2024-04-15', status: 'Active', orders: 112 },
      { id: 5, name: 'Burger Barn', owner: 'Mike Johnson', category: 'Fast Food', phone: '555-1005', email: 'burger@example.com', rating: 4.0, joinDate: '2024-06-01', status: 'Active', orders: 267 }
    ];
    this.filterRestaurants();
  }

  filterRestaurants(): void {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           restaurant.owner.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'all' || restaurant.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

  updateRestaurantStatus(restaurantId: number, newStatus: string): void {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.status = newStatus;
      this.filterRestaurants();
      console.log(`Restaurant ${restaurantId} status updated to ${newStatus}`);
    }
  }

  deleteRestaurant(restaurantId: number): void {
    const index = this.restaurants.findIndex(r => r.id === restaurantId);
    if (index > -1) {
      this.restaurants.splice(index, 1);
      this.filterRestaurants();
      console.log(`Restaurant ${restaurantId} deleted`);
    }
  }
}
