import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { CartComponent } from './components/cart.component';
import { OrdersComponent } from './components/orders.component';
import { ForgetPasswordComponent } from './components/forget-password.component';
import { CustomerHomeComponent } from './components/customer-home.component';
import { OwnerHomeComponent } from './components/owner-home.component';
import { OwnerMenuComponent } from './components/owner-menu.component';
import { OwnerOrdersComponent } from './components/owner-orders.component';
import { AdminHomeComponent } from './components/admin-home.component';
import { AdminUsersComponent } from './components/admin-users.component';
import { AdminRestaurantsComponent } from './components/admin-restaurants.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      
      // Customer Routes
      { 
        path: 'customer',
        canActivate: [RoleGuard],
        data: { roles: ['Customer'] },
        children: [
          { path: 'home', component: CustomerHomeComponent },
          { path: 'cart', component: CartComponent },
          { path: 'orders', component: OrdersComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      },
      
      // Restaurant Owner Routes
      { 
        path: 'owner',
        canActivate: [RoleGuard],
        data: { roles: ['RestaurantOwner'] },
        children: [
          { path: 'home', component: OwnerHomeComponent },
          { path: 'menu', component: OwnerMenuComponent },
          { path: 'orders', component: OwnerOrdersComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      },
      
      // Admin Routes
      { 
        path: 'admin',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        children: [
          { path: 'home', component: AdminHomeComponent },
          { path: 'users', component: AdminUsersComponent },
          { path: 'restaurants', component: AdminRestaurantsComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      }
    ]
  }
];
