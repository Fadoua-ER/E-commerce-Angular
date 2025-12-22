import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { ProductService } from '../../../services/product.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { Order } from '../../../models/order';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div class="orders">
      <h2>Order Details</h2>
      <div *ngIf="order">
        <p>Order ID: {{ order.id }}</p>
        <p>Total: {{ order.total | currency }}</p>
        <p>Status: {{ order.status }}</p>
        <p>Date: {{ order.date | date }}</p>
        <ul>
          <li *ngFor="let item of order.items">{{ getProductName(item.productId) }} - Quantity: {{ item.quantity }}</li>
        </ul>
      </div>
      <app-spinner *ngIf="loading"></app-spinner>
    </div>
  `,
  styles: [`
    .orders {
      padding: 20px;
    }
  `]
})
export class OrdersComponent implements OnInit {
  order: Order | undefined;
  loading = false;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private orderService: OrderService, private authService: AuthService, private productService: ProductService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.loading = true;
      
      // Load products for displaying names
      this.productService.getProducts().subscribe(products => {
        this.products = products;
      });
      
      this.orderService.getOrdersByUser(user.id).subscribe(orders => {
        this.order = orders.find(o => o.id === id);
        this.loading = false;
      });
    }
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : `Product ${productId}`;
  }
}
