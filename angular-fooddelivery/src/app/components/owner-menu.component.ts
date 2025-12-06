import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './owner-menu.component.html',
  styleUrls: ['./owner-menu.component.scss']
})
export class OwnerMenuComponent implements OnInit {
  menuItems: any[] = [];
  showModal: boolean = false;
  editingId: number | null = null;
  newItem: any = {
    name: '',
    category: '',
    price: 0,
    description: '',
    available: true
  };

  constructor() { }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuItems = [
      { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, description: 'Classic pizza with tomato and mozzarella', available: true },
      { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, description: 'Pizza with pepperoni and mozzarella', available: true },
      { id: 3, name: 'Caesar Salad', category: 'Salad', price: 9.99, description: 'Fresh romaine lettuce with caesar dressing', available: true },
      { id: 4, name: 'Garlic Bread', category: 'Appetizer', price: 4.99, description: 'Crispy bread with garlic butter', available: false }
    ];
  }

  openModal(): void {
    this.showModal = true;
    this.editingId = null;
    this.resetForm();
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newItem = {
      name: '',
      category: '',
      price: 0,
      description: '',
      available: true
    };
  }

  addMenuItem(): void {
    if (this.newItem.name && this.newItem.price > 0) {
      const item = {
        id: Math.max(...this.menuItems.map(m => m.id), 0) + 1,
        ...this.newItem
      };
      this.menuItems.push(item);
      console.log('Menu item added:', item);
      this.closeModal();
    }
  }

  editMenuItem(item: any): void {
    this.editingId = item.id;
    this.newItem = { ...item };
    this.showModal = true;
  }

  updateMenuItem(): void {
    if (this.editingId) {
      const index = this.menuItems.findIndex(m => m.id === this.editingId);
      if (index > -1) {
        this.menuItems[index] = { ...this.menuItems[index], ...this.newItem };
        console.log('Menu item updated:', this.menuItems[index]);
        this.closeModal();
      }
    }
  }

  deleteMenuItem(id: number): void {
    this.menuItems = this.menuItems.filter(m => m.id !== id);
    console.log('Menu item deleted:', id);
  }

  toggleAvailability(id: number): void {
    const item = this.menuItems.find(m => m.id === id);
    if (item) {
      item.available = !item.available;
    }
  }
}
