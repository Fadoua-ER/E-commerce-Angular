import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-filter-sidebar',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-sidebar">
      <h3>Categories</h3>
      <ul>
        <li *ngFor="let category of categories">
          <input type="checkbox" [value]="category.id" [(ngModel)]="selectedCategories" />
          {{ category.name }}
        </li>
      </ul>
      <h3>Price Range</h3>
      <input type="range" min="0" max="1000" [(ngModel)]="maxPrice" />
      <p>Max Price: {{ maxPrice }}</p>
    </div>
  `,
  styles: [`
    .filter-sidebar {
      width: 200px;
      padding: 10px;
      border-right: 1px solid #ddd;
    }
  `]
})
export class FilterSidebarComponent implements OnInit {
  categories: Category[] = [];
  selectedCategories: number[] = [];
  maxPrice = 1000;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
