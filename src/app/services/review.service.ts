import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  public reviews$ = this.reviewsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadReviews();
  }

  private loadReviews(): void {
    const stored = localStorage.getItem('reviews');
    if (stored) {
      this.reviewsSubject.next(JSON.parse(stored));
    } else {
      this.http.get<Review[]>('assets/data/reviews.json').subscribe(reviews => {
        this.reviewsSubject.next(reviews);
        localStorage.setItem('reviews', JSON.stringify(reviews));
      });
    }
  }

  private saveReviews(reviews: Review[]): void {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  getReviewsByProduct(productId: number): Observable<Review[]> {
    return new Observable(subscriber => {
      this.reviews$.subscribe(reviews => {
        subscriber.next(reviews.filter(r => r.productId === productId));
      });
    });
  }

  addReview(review: Omit<Review, 'id' | 'date'>): void {
    const newReview: Review = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString()
    };
    const reviews = this.reviewsSubject.value;
    reviews.push(newReview);
    this.reviewsSubject.next(reviews);
    this.saveReviews(reviews);
  }

  deleteReview(id: number): void {
    const reviews = this.reviewsSubject.value.filter(r => r.id !== id);
    this.reviewsSubject.next(reviews);
  }

  getAllReviews(): Observable<Review[]> {
    return this.reviews$;
  }
}
