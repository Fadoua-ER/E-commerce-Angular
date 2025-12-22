import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../../services/wishlist.service';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, SpinnerComponent],
  template: `
    <div class="wishlist">
      <h2>My Wishlist</h2>
      <div class="products" *ngIf="products.length > 0">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>
      <p *ngIf="products.length === 0 && !loading">Your wishlist is empty.</p>
      <app-spinner *ngIf="loading"></app-spinner>
    </div>
  `,
  styles: [`
    .wishlist {
      padding: 20px;
    }
    .products {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class WishlistComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(private wishlistService: WishlistService, private productService: ProductService) {}

  ngOnInit() {
    this.loading = true;
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.productService.getProducts().subscribe(products => {
        this.products = products.filter(p => wishlist.includes(p.id));
        this.loading = false;
      });
    });
  }
}
