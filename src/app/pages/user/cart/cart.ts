import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ToastNotificationComponent } from '../../../shared/toast-notification/toast-notification';
import { CartItem } from '../../../models/cart-item';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, ConfirmDialogComponent, SpinnerComponent, ToastNotificationComponent],
  template: `
    <div class="cart">
      <h2>Shopping Cart</h2>
      <div *ngIf="cartItems.length === 0">Your cart is empty.</div>
      <div *ngFor="let item of cartItems" class="cart-item">
        <img [src]="getProduct(item.productId)?.imageUrl" [alt]="getProduct(item.productId)?.name" />
        <div>
          <h3>{{ getProduct(item.productId)?.name }}</h3>
          <p>Price: {{ getProduct(item.productId)?.price | currency }}</p>
          <input type="number" [value]="item.quantity" (change)="updateQuantity(item.productId, $event)" min="1" />
          <button (click)="removeItem(item.productId)">Remove</button>
        </div>
      </div>
      <p>Total: {{ total | currency }}</p>
      <button (click)="checkout()" *ngIf="cartItems.length > 0">Checkout</button>
      <app-confirm-dialog [show]="showConfirm" [message]="'Clear cart?'" (confirmed)="clearCart($event)"></app-confirm-dialog>
      <app-spinner *ngIf="loading"></app-spinner>
      <app-toast-notification [message]="toastMessage" [type]="toastType" [show]="showToast"></app-toast-notification>
    </div>
  `,
  styles: [`
    .cart {
      padding: 20px;
    }
    .cart-item {
      display: flex;
      margin: 10px 0;
      border: 1px solid #ddd;
      padding: 10px;
    }
    img {
      width: 100px;
      margin-right: 20px;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  products: Product[] = [];
  total = 0;
  loading = false;
  showConfirm = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast = false;

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotal();
    });
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  getProduct(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  updateQuantity(productId: number, event: any) {
    const quantity = +event.target.value;
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      const product = this.getProduct(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  checkout() {
    this.router.navigate(['/user/checkout']);
  }

  clearCart(confirmed: boolean) {
    if (confirmed) {
      this.cartService.clearCart();
    }
    this.showConfirm = false;
  }

  private showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
