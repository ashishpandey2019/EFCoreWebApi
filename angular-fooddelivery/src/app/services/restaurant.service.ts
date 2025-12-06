import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly API_URL = `${environment.apiUrl}/restaurant`;

  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.API_URL);
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.API_URL}/${id}`);
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.API_URL, restaurant);
  }

  updateRestaurant(id: number, restaurant: Restaurant): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, restaurant);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}

