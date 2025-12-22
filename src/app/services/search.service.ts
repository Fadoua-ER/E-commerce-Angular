import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  constructor(private productService: ProductService) {}

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query.toLowerCase());
  }

  searchProducts(): Observable<Product[]> {
    return combineLatest([this.productService.getProducts(), this.searchQuery$]).pipe(
      map(([products, query]) => {
        if (!query) return products;
        return products.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      })
    );
  }
}
