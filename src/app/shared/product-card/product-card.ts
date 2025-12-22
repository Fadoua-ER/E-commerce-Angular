import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-card">
      <div class="product-image">
        <img [src]="product.imageUrl" [alt]="product.name" />
        <div class="product-overlay">
          <button class="wishlist-btn" (click)="toggleWishlist($event)">
            <span class="material-icons" [class.filled]="isInWishlist">favorite</span>
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">{{ product.name }}</h3>
        <div class="product-rating">
          <div class="stars">
            <span class="material-icons star filled" *ngFor="let star of getStars(product.rating)">star</span>
            <span class="material-icons star" *ngFor="let star of getEmptyStars(product.rating)">star</span>
          </div>
          <span class="rating-text">{{ product.rating }}/5</span>
        </div>
        <p class="product-price">{{ product.price | currency }}</p>
        <div class="product-actions">
          <a class="btn-primary" [routerLink]="['/user/product', product.id]">
            <span class="material-icons">visibility</span>
            View Details
          </a>
          <button class="btn-secondary" (click)="addToCart($event)">
            <span class="material-icons">add_shopping_cart</span>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
    }
    .product-image {
      position: relative;
      height: 240px;
      overflow: hidden;
    }
    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .product-card:hover .product-image img {
      transform: scale(1.05);
    }
    .product-overlay {
      position: absolute;
      top: 12px;
      right: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .product-card:hover .product-overlay {
      opacity: 1;
    }
    .wishlist-btn {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .wishlist-btn:hover {
      transform: scale(1.1);
      background: white;
    }
    .wishlist-btn .material-icons {
      color: #ff6b6b;
      font-size: 20px;
      font-variation-settings: 'FILL' 0;
      transition: font-variation-settings 0.3s ease;
    }
    .wishlist-btn .material-icons.filled {
      font-variation-settings: 'FILL' 1;
    }
    .product-info {
      padding: 20px;
    }
    .product-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #333;
      line-height: 1.4;
    }
    .product-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .stars {
      display: flex;
      gap: 2px;
    }
    .star {
      color: #ddd;
      font-size: 16px;
      font-variation-settings: 'FILL' 0;
    }
    .star.filled {
      color: #ffd700;
      font-variation-settings: 'FILL' 1;
    }
    .rating-text {
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }
    .product-price {
      font-size: 20px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 16px;
    }
    .product-actions {
      display: flex;
      gap: 8px;
      flex-direction: column;
    }
    .btn-primary,
    .btn-secondary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 16px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      font-size: 14px;
    }
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    .btn-secondary {
      background: #f8f9fa;
      color: #667eea;
      border: 2px solid #667eea;
    }
    .btn-secondary:hover {
      background: #667eea;
      color: white;
      transform: translateY(-1px);
    }
    @media (max-width: 768px) {
      .product-image {
        height: 200px;
      }
      .product-info {
        padding: 16px;
      }
      .product-actions {
        flex-direction: column;
      }
      .btn-primary,
      .btn-secondary {
        padding: 12px 16px;
      }
    }
  `]
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  isInWishlist = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkWishlistStatus();
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  checkWishlistStatus() {
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.isInWishlist = wishlist.includes(this.product.id);
    });
  }

  toggleWishlist(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
    } else {
      this.wishlistService.addToWishlist(this.product.id);
    }
  }

  addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.product.id);
  }
}
