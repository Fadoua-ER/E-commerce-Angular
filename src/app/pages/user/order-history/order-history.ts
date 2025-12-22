import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, RouterModule, SpinnerComponent],
  template: `
    <div class="order-history">
      <h2>Order History</h2>
      <div *ngFor="let order of orders" class="order">
        <p>Order ID: {{ order.id }}</p>
        <p>Total: {{ order.total | currency }}</p>
        <p>Status: {{ order.status }}</p>
        <p>Date: {{ order.date | date }}</p>
        <a [routerLink]="['/user/orders', order.id]" class="view-details">View Details</a>
      </div>
      <p *ngIf="orders.length === 0 && !loading">No orders yet.</p>
      <app-spinner *ngIf="loading"></app-spinner>
    </div>
  `,
  styles: [`
    .order-history {
      padding: 20px;
    }
    .order {
      border: 1px solid #ddd;
      padding: 10px;
      margin: 10px 0;
    }
    .view-details {
      display: inline-block;
      margin-top: 10px;
      color: #007bff;
      text-decoration: none;
    }
    .view-details:hover {
      text-decoration: underline;
    }
  `]
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = false;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loading = true;
      this.orderService.getOrdersByUser(user.id).subscribe(orders => {
        this.orders = orders;
        this.loading = false;
      });
    }
  }
}
