import { MenuItem } from '../data/menuData';

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  selectedSize?: string;
  selectedDrink?: string;
  selectedSpice?: string;
  unitPrice: number;
  quantity: number;
  notes?: string;
}

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  address: string;
  area: string;
  paymentMethod: 'cod' | 'jazzcash_easypaisa';
  notes?: string;
}
