import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts(): void {
    const stored = localStorage.getItem('products');
    if (stored) {
      this.productsSubject.next(JSON.parse(stored));
    } else {
      this.http.get<Product[]>('assets/data/products.json').subscribe(products => {
        this.productsSubject.next(products);
        localStorage.setItem('products', JSON.stringify(products));
      });
    }
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: number): Observable<Product | undefined> {
    return new Observable(subscriber => {
      this.products$.subscribe(products => {
        subscriber.next(products.find(p => p.id === id));
      });
    });
  }

  addProduct(product: Product): void {
    const products = this.productsSubject.value;
    product.id = Date.now(); // Simple ID
    products.push(product);
    this.productsSubject.next(products);
    this.saveProducts(products);
  }

  updateProduct(product: Product): void {
    const products = this.productsSubject.value;
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
      this.productsSubject.next(products);
      this.saveProducts(products);
    }
  }

  deleteProduct(id: number): void {
    const products = this.productsSubject.value.filter(p => p.id !== id);
    this.productsSubject.next(products);
    this.saveProducts(products);
  }
}
