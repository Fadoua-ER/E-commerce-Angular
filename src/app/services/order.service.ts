import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/order';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>(this.getOrdersFromStorage());
  public orders$ = this.ordersSubject.asObservable();

  private getOrdersFromStorage(): Order[] {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  }

  private saveOrdersToStorage(orders: Order[]): void {
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  placeOrder(userId: number, items: CartItem[], total: number): Observable<Order> {
    const newOrder: Order = {
      id: Date.now(),
      userId,
      items,
      total,
      date: new Date().toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const orders = this.ordersSubject.value;
    orders.push(newOrder);
    this.ordersSubject.next(orders);
    this.saveOrdersToStorage(orders);
    return new Observable(subscriber => subscriber.next(newOrder));
  }

  getOrdersByUser(userId: number): Observable<Order[]> {
    return new Observable(subscriber => {
      this.orders$.subscribe(orders => {
        subscriber.next(orders.filter(o => o.userId === userId));
      });
    });
  }

  updateOrderStatus(orderId: number, status: Order['status']): void {
    const orders = this.ordersSubject.value;
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.ordersSubject.next(orders);
      this.saveOrdersToStorage(orders);
    }
  }

  getAllOrders(): Observable<Order[]> {
    return this.orders$;
  }
}
