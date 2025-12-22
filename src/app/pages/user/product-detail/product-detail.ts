import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { WishlistService } from '../../../services/wishlist.service';
import { ReviewService } from '../../../services/review.service';
import { RatingStarsComponent } from '../../../shared/rating-stars/rating-stars';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ToastNotificationComponent } from '../../../shared/toast-notification/toast-notification';
import { Product } from '../../../models/product';
import { Review } from '../../../models/review';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RatingStarsComponent, SpinnerComponent, ToastNotificationComponent],
  template: `
    <div class="product-detail" *ngIf="product">
      <img [src]="product.imageUrl" [alt]="product.name" />
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>Price: {{ product.price | currency }}</p>
      <app-rating-stars [rating]="product.rating"></app-rating-stars>
      <button (click)="addToCart()">Add to Cart</button>
      <button (click)="addToWishlist()">Add to Wishlist</button>
      <h3>Reviews</h3>
      <div *ngFor="let review of reviews">
        <app-rating-stars [rating]="review.rating"></app-rating-stars>
        <p>{{ review.comment }}</p>
      </div>
      <app-spinner *ngIf="loading"></app-spinner>
      <app-toast-notification [message]="toastMessage" [type]="toastType" [show]="showToast"></app-toast-notification>
    </div>
  `,
  styles: [`
    .product-detail {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    img {
      max-width: 100%;
    }
    button {
      margin: 10px;
      padding: 10px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  reviews: Review[] = [];
  loading = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
    });
    this.reviewService.getReviewsByProduct(id).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product.id);
      this.showToastMessage('Added to cart', 'success');
    }
  }

  addToWishlist() {
    if (this.product) {
      this.wishlistService.addToWishlist(this.product.id);
      this.showToastMessage('Added to wishlist', 'success');
    }
  }

  private showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
