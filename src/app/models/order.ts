import { CartItem } from './cart-item';

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}
