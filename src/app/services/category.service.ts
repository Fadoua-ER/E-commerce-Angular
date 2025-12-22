import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCategories();
  }

  private loadCategories(): void {
    const stored = localStorage.getItem('categories');
    if (stored) {
      this.categoriesSubject.next(JSON.parse(stored));
    } else {
      this.http.get<Category[]>('assets/data/categories.json').subscribe(categories => {
        this.categoriesSubject.next(categories);
        localStorage.setItem('categories', JSON.stringify(categories));
      });
    }
  }

  private saveCategories(categories: Category[]): void {
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  getCategoryById(id: number): Observable<Category | undefined> {
    return new Observable((subscriber) => {
      this.categories$.subscribe((categories) => {
        subscriber.next(categories.find((c) => c.id === id));
      });
    });
  }

  addCategory(category: Category): void {
    const categories = this.categoriesSubject.value;
    category.id = Date.now();
    categories.push(category);
    this.categoriesSubject.next(categories);
    this.saveCategories(categories);
  }

  updateCategory(category: Category): void {
    const categories = this.categoriesSubject.value;
    const index = categories.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      categories[index] = category;
      this.categoriesSubject.next(categories);
      this.saveCategories(categories);
    }
  }

  deleteCategory(id: number): void {
    const categories = this.categoriesSubject.value.filter(c => c.id !== id);
    this.categoriesSubject.next(categories);
    this.saveCategories(categories);
  }
}
