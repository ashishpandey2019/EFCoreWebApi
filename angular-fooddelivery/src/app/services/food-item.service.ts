import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurantId: number;
  imageUrl?: string;
}

export interface FoodItemCreateDto {
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private readonly API_URL = `${environment.apiUrl}/fooditems`;

  constructor(private http: HttpClient) { }

  getAllFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.API_URL);
  }

  getFoodItemById(id: number): Observable<FoodItem> {
    return this.http.get<FoodItem>(`${this.API_URL}/${id}`);
  }

  getFoodItemsByRestaurant(restaurantId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.API_URL}/restaurant/${restaurantId}`);
  }

  createFoodItem(item: FoodItemCreateDto): Observable<FoodItem> {
    return this.http.post<FoodItem>(this.API_URL, item);
  }

  updateFoodItem(id: number, item: FoodItemCreateDto): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, item);
  }

  deleteFoodItem(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
