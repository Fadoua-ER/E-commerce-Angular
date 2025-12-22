import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink],
  template: `
    <div class="order-success">
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase.</p>
      <a routerLink="/user/order-history">View Orders</a>
    </div>
  `,
  styles: [`
    .order-success {
      text-align: center;
      padding: 50px;
    }
  `]
})
export class OrderSuccessComponent {}
