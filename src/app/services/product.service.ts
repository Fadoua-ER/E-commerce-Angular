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
      return;
    }

    const defaultProducts: Product[] = [
      { id: 1, name: 'Classic Sneakers', description: 'Comfortable everyday sneakers', price: 59.99, categoryId: 1, imageUrl: '/assets/img/product1.jpg', stock: 120, rating: 4.5, reviewsCount: 24 },
      { id: 2, name: 'Leather Wallet', description: 'Genuine leather bifold wallet', price: 34.99, categoryId: 2, imageUrl: '/assets/img/product2.jpg', stock: 80, rating: 4.2, reviewsCount: 12 },
      { id: 3, name: 'Wireless Headphones', description: 'Noise cancelling over-ear headphones', price: 129.99, categoryId: 3, imageUrl: '/assets/img/product3.jpg', stock: 45, rating: 4.7, reviewsCount: 58 }
    ];

    this.productsSubject.next(defaultProducts);
    this.saveProducts(defaultProducts);
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
