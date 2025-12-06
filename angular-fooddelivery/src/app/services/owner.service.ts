import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RestaurantCreateDto {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface FoodItemCreateDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  availableQuantity: number;
  restaurantId: number;
}

export interface OrderStatusUpdate {
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private readonly OWNER_API_URL = `${environment.apiUrl}/owner`;
  private readonly RESTAURANT_API_URL = `${environment.apiUrl}/restaurant`;
  private readonly FOOD_ITEMS_API_URL = `${environment.apiUrl}/fooditems`;

  constructor(private http: HttpClient) { }

  // Restaurant management
  getMyRestaurant(): Observable<any> {
    return this.http.get(`${this.RESTAURANT_API_URL}/my-restaurant`);
  }

  createRestaurant(restaurant: RestaurantCreateDto): Observable<any> {
    return this.http.post(`${this.RESTAURANT_API_URL}`, restaurant);
  }

  updateRestaurant(id: number, restaurant: RestaurantCreateDto): Observable<any> {
    return this.http.put(`${this.RESTAURANT_API_URL}/${id}`, restaurant);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.RESTAURANT_API_URL}/${id}`);
  }

  // Food items management
  getRestaurantFoodItems(restaurantId: number): Observable<any> {
    return this.http.get(`${this.FOOD_ITEMS_API_URL}?restaurantId=${restaurantId}`);
  }

  createFoodItem(foodItem: FoodItemCreateDto): Observable<any> {
    return this.http.post(`${this.FOOD_ITEMS_API_URL}`, foodItem);
  }

  updateFoodItem(id: number, foodItem: FoodItemCreateDto): Observable<any> {
    return this.http.put(`${this.FOOD_ITEMS_API_URL}/${id}`, foodItem);
  }

  deleteFoodItem(id: number): Observable<any> {
    return this.http.delete(`${this.FOOD_ITEMS_API_URL}/${id}`);
  }

  // Order management for restaurant owner
  getRestaurantOrders(): Observable<any> {
    return this.http.get(`${this.OWNER_API_URL}/orders`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.OWNER_API_URL}/orders/${orderId}/status`, { status });
  }

  getOrderStats(): Observable<any> {
    return this.http.get(`${this.OWNER_API_URL}/statistics`);
  }
}
