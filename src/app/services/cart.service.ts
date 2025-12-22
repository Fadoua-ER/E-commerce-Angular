import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadCartForUser(user.id);
      } else {
        this.cartSubject.next([]);
      }
    });
  }

  private loadCartForUser(userId: number): void {
    const cart = localStorage.getItem(`cart_${userId}`);
    this.cartSubject.next(cart ? JSON.parse(cart) : []);
  }

  private saveCartToStorage(cart: CartItem[]): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }

  addToCart(productId: number, quantity: number = 1): void {
    const cart = this.cartSubject.value;
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    this.cartSubject.next(cart);
    this.saveCartToStorage(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.cartSubject.value.filter(item => item.productId !== productId);
    this.cartSubject.next(cart);
    this.saveCartToStorage(cart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const cart = this.cartSubject.value;
    const item = cart.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next(cart);
      this.saveCartToStorage(cart);
    }
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCartToStorage([]);
  }

  getCart(): Observable<CartItem[]> {
    return this.cart$;
  }
}
