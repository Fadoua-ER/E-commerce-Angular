import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-orders-detail',
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div class="orders-detail">
      <h2>Order Details</h2>
      <div *ngIf="order">
        <p>Order ID: {{ order.id }}</p>
        <p>User ID: {{ order.userId }}</p>
        <p>Total: {{ order.total | currency }}</p>
        <p>Status: {{ order.status }}</p>
        <p>Date: {{ order.date | date }}</p>
        <ul>
          <li *ngFor="let item of order.items">Product ID: {{ item.productId }}, Quantity: {{ item.quantity }}</li>
        </ul>
      </div>
      <app-spinner *ngIf="loading"></app-spinner>
    </div>
  `,
  styles: [`
    .orders-detail {
      padding: 20px;
    }
  `]
})
export class OrdersDetailComponent implements OnInit {
  order: Order | undefined;
  loading = false;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.orderService.getAllOrders().subscribe(orders => {
      this.order = orders.find(o => o.id === id);
      this.loading = false;
    });
  }
}
