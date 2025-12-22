import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  template: `
    <div class="search-bar">
      <div class="search-input-container">
        <span class="material-icons search-icon">search</span>
        <input
          type="text"
          [(ngModel)]="query"
          (keyup.enter)="search()"
          placeholder="Search for products, brands, categories..."
          class="search-input"
        />
        <button (click)="search()" class="search-btn" *ngIf="query.trim()">
          <span class="material-icons">arrow_forward</span>
        </button>
      </div>
      <div class="search-filters" *ngIf="showFilters">
        <select [(ngModel)]="category" class="filter-select">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
        <select [(ngModel)]="sortBy" class="filter-select">
          <option value="relevance">Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .search-bar {
      margin: 24px 0;
      max-width: 800px;
    }
    .search-input-container {
      position: relative;
      display: flex;
      align-items: center;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 2px solid transparent;
      transition: all 0.3s ease;
      overflow: hidden;
    }
    .search-input-container:focus-within {
      border-color: #667eea;
      box-shadow: 0 4px 25px rgba(102, 126, 234, 0.15);
    }
    .search-icon {
      color: #667eea;
      margin-left: 16px;
      font-size: 20px;
    }
    .search-input {
      flex: 1;
      padding: 16px 16px 16px 8px;
      border: none;
      outline: none;
      font-size: 16px;
      font-family: inherit;
      background: transparent;
    }
    .search-input::placeholder {
      color: #999;
    }
    .search-btn {
      background: #667eea;
      border: none;
      padding: 12px 16px;
      border-radius: 8px;
      margin: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-btn:hover {
      background: #5a67d8;
      transform: scale(1.05);
    }
    .search-btn .material-icons {
      color: white;
      font-size: 18px;
    }
    .search-filters {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }
    .filter-select {
      padding: 10px 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      font-family: inherit;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .filter-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    @media (max-width: 768px) {
      .search-bar {
        margin: 16px 0;
      }
      .search-input-container {
        margin: 0 8px;
      }
      .search-filters {
        flex-direction: column;
      }
      .filter-select {
        width: 100%;
      }
    }
  `]
})
export class SearchBarComponent {
  query = '';
  category = '';
  sortBy = 'relevance';
  showFilters = false;

  constructor(private searchService: SearchService, private router: Router) {}

  search() {
    if (this.query.trim()) {
      this.searchService.setSearchQuery(this.query);
      this.router.navigate(['/user/search']);
    }
  }
}
