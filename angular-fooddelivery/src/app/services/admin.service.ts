import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderStatusUpdate {
  status: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalRestaurants: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.API_URL}/orders/${orderId}/status`, { status });
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.API_URL}/orders`);
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/orders/${orderId}`);
  }

  getUserStatistics(): Observable<any> {
    return this.http.get(`${this.API_URL}/statistics/users`);
  }

  getRevenueStatistics(): Observable<any> {
    return this.http.get(`${this.API_URL}/statistics/revenue`);
  }
}
