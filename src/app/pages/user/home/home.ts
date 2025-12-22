import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card';
import { CategoryCardComponent } from '../../../shared/category-card/category-card';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CategoryCardComponent, SearchBarComponent, SpinnerComponent],
  template: `
    <div class="user-theme">
      <div class="app-container">
        <app-search-bar></app-search-bar>

        <section class="hero-section">
          <div class="hero-content">
            <h1>Welcome to E-Commerce</h1>
            <p>Discover amazing products at great prices</p>
            <a routerLink="/user/search" class="btn-primary">
              <span class="material-icons">search</span>
              Start Shopping
            </a>
          </div>
        </section>

        <section class="categories-section">
          <h2 class="section-title">
            <span class="material-icons">category</span>
            Shop by Category
          </h2>
          <div class="grid">
            <app-category-card *ngFor="let category of categories" [category]="category"></app-category-card>
          </div>
        </section>

        <section class="featured-section">
          <h2 class="section-title">
            <span class="material-icons">star</span>
            Featured Products
          </h2>
          <div class="grid">
            <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
          </div>
        </section>

        <app-spinner *ngIf="loading"></app-spinner>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      padding: 60px 40px;
      text-align: center;
      color: white;
      margin-bottom: 40px;
      box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
    }
    .hero-content h1 {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 32px;
      opacity: 0.9;
    }
    .hero-content .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 16px 32px;
      font-size: 18px;
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    .hero-content .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 2rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 3px solid #667eea;
    }
    .section-title .material-icons {
      color: #667eea;
      font-size: 28px;
    }
    .categories-section,
    .featured-section {
      margin-bottom: 60px;
    }
    @media (max-width: 768px) {
      .hero-section {
        padding: 40px 20px;
      }
      .hero-content h1 {
        font-size: 2rem;
      }
      .hero-content p {
        font-size: 1rem;
      }
      .section-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = false;

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.loading = true;
    this.productService.getProducts().subscribe(products => {
      this.products = products.slice(0, 6); // Featured
      this.loading = false;
    });
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
