import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  popularRestaurants: any[] = [];
  promotions: any[] = [];
  cuisines: any[] = [];
  searchTerm: string = '';
  selectedCuisine: string = 'all';
  sortBy: string = 'rating';
  isLoading: boolean = false;
  deliveryAddress: string = '123 Main Street, Apt 4B';
  estimatedDelivery: string = '30-45 min';

  constructor() { }

  ngOnInit(): void {
    this.loadCuisines();
    this.loadPromotions();
    this.loadRestaurants();
  }

  loadCuisines(): void {
    this.cuisines = [
      { id: 'all', name: 'All', icon: '🍽️' },
      { id: 'italian', name: 'Italian', icon: '🍝' },
      { id: 'chinese', name: 'Chinese', icon: '🥢' },
      { id: 'indian', name: 'Indian', icon: '🍛' },
      { id: 'mexican', name: 'Mexican', icon: '🌮' },
      { id: 'japanese', name: 'Japanese', icon: '🍣' },
      { id: 'thai', name: 'Thai', icon: '🍜' },
      { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
      { id: 'pizza', name: 'Pizza', icon: '🍕' },
      { id: 'dessert', name: 'Dessert', icon: '🍰' }
    ];
  }

  loadPromotions(): void {
    this.promotions = [
      { id: 1, title: '50% OFF on First Order', code: 'FIRST50', restaurants: 'All Restaurants', expires: '5 days' },
      { id: 2, title: 'Free Delivery on Orders $25+', code: 'FREEDEL25', restaurants: 'Selected Restaurants', expires: '10 days' },
      { id: 3, title: 'Buy 1 Get 1 Free Pizza', code: 'PIZZA2FOR1', restaurants: 'Pizza Palace, Pasta Maestro', expires: '3 days' },
      { id: 4, title: 'Extra 30% OFF on Desserts', code: 'SWEET30', restaurants: 'All Dessert Shops', expires: '7 days' }
    ];
  }

  loadRestaurants(): void {
    this.isLoading = true;
    // Comprehensive mock data
    this.restaurants = [
      {
        id: 1,
        name: 'Pizza Palace',
        cuisine: 'italian',
        rating: 4.7,
        reviews: 2340,
        deliveryTime: '30-40 min',
        deliveryFee: '$2.99',
        minOrder: '$15',
        isOpen: true,
        isFeatured: true,
        discount: '20%',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop',
        cuisines: ['Italian', 'Pizza'],
        popular: ['Margherita Pizza', 'Pepperoni', 'Garlic Bread'],
        address: '456 Park Ave',
        distance: '1.2 km',
        badge: 'Popular'
      },
      {
        id: 2,
        name: 'Dragon House',
        cuisine: 'chinese',
        rating: 4.5,
        reviews: 1890,
        deliveryTime: '25-35 min',
        deliveryFee: '$1.99',
        minOrder: '$10',
        isOpen: true,
        isFeatured: false,
        discount: '15%',
        image: 'https://images.unsplash.com/photo-1585238341710-4913b86b8b85?w=500&h=300&fit=crop',
        cuisines: ['Chinese', 'Asian'],
        popular: ['Chow Mein', 'Fried Rice', 'Spring Rolls'],
        address: '789 Ocean Blvd',
        distance: '2.1 km',
        badge: 'Fast Delivery'
      },
      {
        id: 3,
        name: 'Spice Route',
        cuisine: 'indian',
        rating: 4.8,
        reviews: 3120,
        deliveryTime: '35-45 min',
        deliveryFee: '$2.49',
        minOrder: '$12',
        isOpen: true,
        isFeatured: true,
        discount: '25%',
        image: 'https://images.unsplash.com/photo-1596040306874-e9f5a45e3c0f?w=500&h=300&fit=crop',
        cuisines: ['Indian', 'Curry', 'Vegetarian'],
        popular: ['Butter Chicken', 'Biryani', 'Naan'],
        address: '321 Spice Lane',
        distance: '1.8 km',
        badge: 'Highly Rated'
      },
      {
        id: 4,
        name: 'Taco Fiesta',
        cuisine: 'mexican',
        rating: 4.4,
        reviews: 1650,
        deliveryTime: '20-30 min',
        deliveryFee: '$1.49',
        minOrder: '$8',
        isOpen: true,
        isFeatured: false,
        discount: '10%',
        image: 'https://images.unsplash.com/photo-1565693566604-a0ead0ea612e?w=500&h=300&fit=crop',
        cuisines: ['Mexican', 'Tacos', 'Burritos'],
        popular: ['Carne Asada Tacos', 'Burrito Supreme', 'Enchiladas'],
        address: '654 Taco Terrace',
        distance: '0.9 km',
        badge: 'Fastest Delivery'
      },
      {
        id: 5,
        name: 'Burger Barn',
        cuisine: 'fast-food',
        rating: 4.3,
        reviews: 4520,
        deliveryTime: '15-25 min',
        deliveryFee: '$0.99',
        minOrder: '$5',
        isOpen: true,
        isFeatured: false,
        discount: '5%',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
        cuisines: ['Burgers', 'Fast Food', 'American'],
        popular: ['Classic Burger', 'Cheese Fries', 'Milkshakes'],
        address: '987 Fast Lane',
        distance: '0.5 km',
        badge: 'Best Price'
      },
      {
        id: 6,
        name: 'Pasta Maestro',
        cuisine: 'italian',
        rating: 4.6,
        reviews: 2800,
        deliveryTime: '30-40 min',
        deliveryFee: '$2.49',
        minOrder: '$14',
        isOpen: true,
        isFeatured: true,
        discount: '18%',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
        cuisines: ['Italian', 'Pasta', 'Seafood'],
        popular: ['Spaghetti Carbonara', 'Fettuccine Alfredo', 'Risotto'],
        address: '111 Italia Road',
        distance: '1.5 km',
        badge: 'Popular'
      },
      {
        id: 7,
        name: 'Sushi Palace',
        cuisine: 'japanese',
        rating: 4.7,
        reviews: 1920,
        deliveryTime: '35-45 min',
        deliveryFee: '$3.99',
        minOrder: '$20',
        isOpen: true,
        isFeatured: true,
        discount: '22%',
        image: 'https://images.unsplash.com/photo-1553621042-f6b0136e7a1d?w=500&h=300&fit=crop',
        cuisines: ['Japanese', 'Sushi', 'Asian'],
        popular: ['California Roll', 'Dragon Roll', 'Tempura'],
        address: '222 Wasabi Way',
        distance: '2.3 km',
        badge: 'Premium'
      },
      {
        id: 8,
        name: 'Thai Orchid',
        cuisine: 'thai',
        rating: 4.5,
        reviews: 1450,
        deliveryTime: '28-38 min',
        deliveryFee: '$2.99',
        minOrder: '$11',
        isOpen: true,
        isFeatured: false,
        discount: '12%',
        image: 'https://images.unsplash.com/photo-1599599810694-b0483db266ce?w=500&h=300&fit=crop',
        cuisines: ['Thai', 'Curry', 'Asian'],
        popular: ['Pad Thai', 'Green Curry', 'Tom Yum'],
        address: '333 Bangkok Boulevard',
        distance: '1.6 km',
        badge: null
      },
      {
        id: 9,
        name: 'Sweet Dreams',
        cuisine: 'dessert',
        rating: 4.9,
        reviews: 1120,
        deliveryTime: '15-20 min',
        deliveryFee: '$1.49',
        minOrder: '$6',
        isOpen: true,
        isFeatured: true,
        discount: '30%',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
        cuisines: ['Dessert', 'Bakery', 'Sweets'],
        popular: ['Chocolate Cake', 'Cheesecake', 'Ice Cream'],
        address: '444 Sweet Street',
        distance: '0.8 km',
        badge: 'Best Dessert'
      },
      {
        id: 10,
        name: 'Greek Taverna',
        cuisine: 'italian',
        rating: 4.4,
        reviews: 980,
        deliveryTime: '32-42 min',
        deliveryFee: '$2.99',
        minOrder: '$13',
        isOpen: true,
        isFeatured: false,
        discount: '15%',
        image: 'https://images.unsplash.com/photo-1573521193529-303ff495ee0e?w=500&h=300&fit=crop',
        cuisines: ['Mediterranean', 'Greek', 'Vegetarian'],
        popular: ['Moussaka', 'Souvlaki', 'Falafel Wrap'],
        address: '555 Olive Avenue',
        distance: '2.0 km',
        badge: null
      }
    ];

    // Set popular restaurants (top rated)
    this.popularRestaurants = this.restaurants
      .filter(r => r.isFeatured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    this.filterRestaurants();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  filterRestaurants(): void {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurant.cuisines.some((c: string) => c.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesCuisine = this.selectedCuisine === 'all' || restaurant.cuisine === this.selectedCuisine;
      return matchesSearch && matchesCuisine && restaurant.isOpen;
    });

    // Apply sorting
    if (this.sortBy === 'rating') {
      this.filteredRestaurants.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'delivery') {
      this.filteredRestaurants.sort((a, b) => {
        const timeA = parseInt(a.deliveryTime.split('-')[0]);
        const timeB = parseInt(b.deliveryTime.split('-')[0]);
        return timeA - timeB;
      });
    } else if (this.sortBy === 'distance') {
      this.filteredRestaurants.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });
    }
  }

  onSearchChange(): void {
    this.filterRestaurants();
  }

  onCuisineChange(): void {
    this.filterRestaurants();
  }

  onSortChange(): void {
    this.filterRestaurants();
  }

  viewRestaurantMenu(restaurantId: number): void {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    console.log('View menu for restaurant:', restaurant?.name);
  }

  getRatingColor(rating: number): string {
    if (rating >= 4.7) return '#4CAF50'; // Green
    if (rating >= 4.3) return '#FF9800'; // Orange
    return '#f44336'; // Red
  }

  getStarArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = Array(fullStars).fill(1);
    if (hasHalfStar) stars.push(0.5);
    return stars;
  }
}
