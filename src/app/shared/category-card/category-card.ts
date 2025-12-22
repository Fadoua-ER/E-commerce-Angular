import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-card',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="category-card">
      <div class="category-icon">
        <span class="material-icons">{{ getCategoryIcon(category.name) }}</span>
      </div>
      <div class="category-content">
        <h3 class="category-title">{{ category.name }}</h3>
        <p class="category-description">{{ category.description }}</p>
        <a class="btn-primary" [routerLink]="['/user/category', category.id]">
          <span class="material-icons">arrow_forward</span>
          Explore
        </a>
      </div>
    </div>
  `,
  styles: [`
    .category-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      padding: 24px;
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.05);
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .category-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    }
    .category-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .category-icon .material-icons {
      font-size: 36px;
      color: white;
    }
    .category-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .category-title {
      font-size: 1.4rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
      line-height: 1.3;
    }
    .category-description {
      color: #666;
      margin-bottom: 20px;
      line-height: 1.5;
      flex: 1;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
      margin-top: auto;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    .btn-primary .material-icons {
      font-size: 16px;
    }
    @media (max-width: 768px) {
      .category-card {
        padding: 20px;
      }
      .category-icon {
        width: 70px;
        height: 70px;
      }
      .category-icon .material-icons {
        font-size: 32px;
      }
      .category-title {
        font-size: 1.2rem;
      }
    }
  `]
})
export class CategoryCardComponent {
  @Input() category!: Category;

  getCategoryIcon(categoryName: string): string {
    const icons: { [key: string]: string } = {
      'Electronics': 'devices',
      'Clothing': 'checkroom',
      'Books': 'menu_book',
      'Home & Garden': 'home',
      'Sports': 'sports_soccer',
      'Beauty': 'spa',
      'Toys': 'toys',
      'Automotive': 'drive_eta',
      'Health': 'local_hospital',
      'Food': 'restaurant'
    };
    return icons[categoryName] || 'category';
  }
}
