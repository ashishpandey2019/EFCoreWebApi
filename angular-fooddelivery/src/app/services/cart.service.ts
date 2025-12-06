import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CartItem {
  id: number;
  foodItemId: number;
  quantity: number;
  foodItem?: any;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly API_URL = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) { }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.API_URL);
  }

  addToCart(foodItemId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.API_URL}/add?foodItemId=${foodItemId}&quantity=${quantity}`, {});
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/remove/${cartItemId}`);
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.API_URL}/update/${cartItemId}?quantity=${quantity}`, {});
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.API_URL}/clear`);
  }
}
