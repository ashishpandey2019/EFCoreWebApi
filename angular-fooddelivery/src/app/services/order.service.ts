import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderItem {
  foodItemId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderDto {
  items: OrderItem[];
  deliveryAddress: string;
}

export interface Order {
  id: number;
  userId: number;
  orderItems: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: Date;
}

export interface UpdateOrderStatusDto {
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) { }

  createOrder(orderDto: CreateOrderDto): Observable<Order> {
    return this.http.post<Order>(this.API_URL, orderDto);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/${id}`);
  }

  updateOrderStatus(id: number, statusDto: UpdateOrderStatusDto): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/status`, statusDto);
  }

  cancelOrder(id: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${id}/cancel`, {});
  }
}
