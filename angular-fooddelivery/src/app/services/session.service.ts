import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionDataSubject = new BehaviorSubject<any>(null);
  public sessionData$ = this.sessionDataSubject.asObservable();

  private cartItems: any[] = [];
  private selectedRestaurant: any = null;
  private filters: any = {};

  constructor() { }

  // Set session data
  setSessionData(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
    this.updateSessionDataSubject();
  }

  // Get session data
  getSessionData(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Remove session data
  removeSessionData(key: string): void {
    sessionStorage.removeItem(key);
    this.updateSessionDataSubject();
  }

  // Cart operations
  addToCart(item: any): void {
    this.cartItems.push(item);
    this.setSessionData('cartItems', this.cartItems);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.removeSessionData('cartItems');
  }

  // Restaurant operations
  setSelectedRestaurant(restaurant: any): void {
    this.selectedRestaurant = restaurant;
    this.setSessionData('selectedRestaurant', restaurant);
  }

  getSelectedRestaurant(): any {
    return this.selectedRestaurant;
  }

  clearSelectedRestaurant(): void {
    this.selectedRestaurant = null;
    this.removeSessionData('selectedRestaurant');
  }

  // Filter operations
  setFilters(filters: any): void {
    this.filters = filters;
    this.setSessionData('filters', filters);
  }

  getFilters(): any {
    return this.filters;
  }

  clearFilters(): void {
    this.filters = {};
    this.removeSessionData('filters');
  }

  // Clear all session data
  clearAllSessionData(): void {
    this.cartItems = [];
    this.selectedRestaurant = null;
    this.filters = {};
    sessionStorage.clear();
    localStorage.removeItem('filters');
    localStorage.removeItem('searchTerm');
    localStorage.removeItem('cartItems');
    this.sessionDataSubject.next(null);
  }

  private updateSessionDataSubject(): void {
    const allData = {
      cartItems: this.cartItems,
      selectedRestaurant: this.selectedRestaurant,
      filters: this.filters
    };
    this.sessionDataSubject.next(allData);
  }
}
