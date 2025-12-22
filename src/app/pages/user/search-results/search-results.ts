import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../services/search.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, ProductCardComponent, SpinnerComponent],
  template: `
    <div class="search-results">
      <h2>Search Results</h2>
      <div class="products" *ngIf="products.length > 0">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>
      <p *ngIf="products.length === 0 && !loading">No products found.</p>
      <app-spinner *ngIf="loading"></app-spinner>
    </div>
  `,
  styles: [`
    .search-results {
      padding: 20px;
    }
    .products {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class SearchResultsComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.loading = true;
    this.searchService.searchProducts().subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }
}
