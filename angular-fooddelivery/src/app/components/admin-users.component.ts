import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  filterRole: string = 'all';
  filterStatus: string = 'all';

  constructor() { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0101', role: 'Customer', joinDate: '2024-01-15', status: 'Active', orders: 12 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', role: 'RestaurantOwner', joinDate: '2024-02-20', status: 'Active', restaurant: 'Pizza Palace' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0103', role: 'Customer', joinDate: '2024-03-10', status: 'Inactive', orders: 5 },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '555-0104', role: 'Customer', joinDate: '2024-04-05', status: 'Active', orders: 28 },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '555-0105', role: 'RestaurantOwner', joinDate: '2024-05-12', status: 'Active', restaurant: 'Dragon House' },
      { id: 6, name: 'Diana Martin', email: 'diana@example.com', phone: '555-0106', role: 'Customer', joinDate: '2024-06-01', status: 'Suspended', orders: 3 }
    ];
    this.filterUsers();
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRole = this.filterRole === 'all' || user.role === this.filterRole;
      const matchesStatus = this.filterStatus === 'all' || user.status === this.filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  updateUserStatus(userId: number, newStatus: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = newStatus;
      this.filterUsers();
      console.log(`User ${userId} status updated to ${newStatus}`);
    }
  }

  deleteUser(userId: number): void {
    const index = this.users.findIndex(u => u.id === userId);
    if (index > -1) {
      this.users.splice(index, 1);
      this.filterUsers();
      console.log(`User ${userId} deleted`);
    }
  }
}
