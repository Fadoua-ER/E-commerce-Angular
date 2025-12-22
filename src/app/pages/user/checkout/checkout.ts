import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ToastNotificationComponent } from '../../../shared/toast-notification/toast-notification';
import { CartItem } from '../../../models/cart-item';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, SpinnerComponent, ToastNotificationComponent],
  template: `
    <div class="checkout">
      <h2>Checkout</h2>
      <form (ngSubmit)="placeOrder()">
        <h3>Shipping Address</h3>
        <input type="text" [(ngModel)]="address" name="address" placeholder="Address" required />
        <input type="text" [(ngModel)]="city" name="city" placeholder="City" required />
        <input type="text" [(ngModel)]="zip" name="zip" placeholder="ZIP Code" required />
        <h3>Payment</h3>
        <input type="text" [(ngModel)]="cardNumber" name="cardNumber" placeholder="Card Number" required />
        <input type="text" [(ngModel)]="expiry" name="expiry" placeholder="Expiry" required />
        <input type="text" [(ngModel)]="cvv" name="cvv" placeholder="CVV" required />
        <p>Total: {{ total | currency }}</p>
        <button type="submit" [disabled]="loading">Place Order</button>
      </form>
      <app-spinner *ngIf="loading"></app-spinner>
      <app-toast-notification [message]="toastMessage" [type]="toastType" [show]="showToast"></app-toast-notification>
    </div>
  `,
  styles: [`
    .checkout {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    input, button {
      margin: 10px 0;
      padding: 10px;
    }
  `]
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  address = '';
  city = '';
  zip = '';
  cardNumber = '';
  expiry = '';
  cvv = '';
  loading = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    // Assume total is calculated in cart, but for simplicity
    this.total = 100; // Placeholder
  }

  placeOrder() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loading = true;
      this.orderService.placeOrder(user.id, this.cartItems, this.total).subscribe({
        next: () => {
          this.loading = false;
          this.cartService.clearCart();
          this.router.navigate(['/user/order-success']);
        },
        error: () => {
          this.loading = false;
          this.showToastMessage('Order failed', 'error');
        }
      });
    }
  }

  private showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
