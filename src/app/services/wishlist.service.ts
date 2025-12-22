import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<number[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadWishlistForUser(user.id);
      } else {
        this.wishlistSubject.next([]);
      }
    });
  }

  private loadWishlistForUser(userId: number): void {
    const wishlist = localStorage.getItem(`wishlist_${userId}`);
    this.wishlistSubject.next(wishlist ? JSON.parse(wishlist) : []);
  }

  private saveWishlistToStorage(wishlist: number[]): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    }
  }

  addToWishlist(productId: number): void {
    const wishlist = this.wishlistSubject.value;
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      this.wishlistSubject.next(wishlist);
      this.saveWishlistToStorage(wishlist);
    }
  }

  removeFromWishlist(productId: number): void {
    const wishlist = this.wishlistSubject.value.filter(id => id !== productId);
    this.wishlistSubject.next(wishlist);
    this.saveWishlistToStorage(wishlist);
  }

  isInWishlist(productId: number): Observable<boolean> {
    return new Observable(subscriber => {
      this.wishlist$.subscribe(wishlist => {
        subscriber.next(wishlist.includes(productId));
      });
    });
  }

  getWishlist(): Observable<number[]> {
    return this.wishlist$;
  }
}
