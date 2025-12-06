import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, AuthResponse } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isLoggedIn = false;
  currentUserName = '';
  currentUserRole = '';
  isAdmin = false;
  isDeliveryPartner = false;
  isCustomer = false;
  isRestaurantOwner = false;

  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService) {
    this.authService.currentUser$.subscribe((user: AuthResponse | null) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.currentUserName = user.username;
        this.currentUserRole = user.role;
        this.isAdmin = user.role === 'Admin';
        this.isDeliveryPartner = user.role === 'DeliveryPartner';
        this.isCustomer = user.role === 'Customer';
        this.isRestaurantOwner = user.role === 'RestaurantOwner';
      } else {
        this.currentUserName = '';
        this.currentUserRole = '';
        this.isAdmin = false;
        this.isDeliveryPartner = false;
        this.isCustomer = false;
        this.isRestaurantOwner = false;
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    const refreshToken = this.authService.getRefreshToken();
    if (refreshToken) {
      this.authService.logout(refreshToken).subscribe({
        next: () => {
          console.log('Logout successful');
          this.resetUIState();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Logout error, performing local logout', error);
          // Even if API call fails, perform local logout
          this.authService.logoutLocal();
          this.resetUIState();
          this.router.navigate(['/login']);
        }
      });
    } else {
      // No refresh token, just clear local data
      this.authService.logoutLocal();
      this.resetUIState();
      this.router.navigate(['/login']);
    }
  }

  private resetUIState(): void {
    // Reset all UI state variables
    this.isLoggedIn = false;
    this.currentUserName = '';
    this.currentUserRole = '';
    this.isAdmin = false;
    this.isDeliveryPartner = false;
    this.isCustomer = false;
    this.isRestaurantOwner = false;
    
    // Clear session data
    this.sessionService.clearAllSessionData();
  }
}
