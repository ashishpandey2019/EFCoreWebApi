import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RestaurantService, Restaurant } from '../services/restaurant.service';
import { AuthService, AuthResponse } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];
  isLoading = true;
  isLoggedIn = false;
  currentUser: AuthResponse | null = null;
  isAdmin = false;
  isDeliveryPartner = false;
  isCustomer = false;
  isRestaurantOwner = false;
  
  featuredStats = [
    { icon: '🍔', label: 'Restaurants', value: 287 },
    { icon: '🚀', label: 'Fast Delivery', value: '30 min' },
    { icon: '⭐', label: 'Avg Rating', value: '4.5' },
    { icon: '👥', label: 'Happy Customers', value: '50K+' }
  ];

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe((user: AuthResponse | null) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      if (user) {
        this.isAdmin = user.role === 'Admin';
        this.isDeliveryPartner = user.role === 'DeliveryPartner';
        this.isCustomer = user.role === 'Customer';
        this.isRestaurantOwner = user.role === 'RestaurantOwner';
      } else {
        this.isAdmin = false;
        this.isDeliveryPartner = false;
        this.isCustomer = false;
        this.isRestaurantOwner = false;
      }
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  viewRestaurant(id: number): void {
    this.router.navigate(['/restaurant', id]);
  }

  editRestaurant(id: number): void {
    this.router.navigate(['/admin/restaurant', id]);
  }
}
