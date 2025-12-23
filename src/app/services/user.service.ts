import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers(): void {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (storedUsers && storedUsers.length) {
      this.usersSubject.next(storedUsers);
      return;
    }

    const defaultUsers: User[] = [
      { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'ADMIN' },
      { id: 2, name: 'John Doe', email: 'user@example.com', password: 'user123', role: 'USER' }
    ];

    this.usersSubject.next(defaultUsers);
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number): Observable<User | undefined> {
    return new Observable(subscriber => {
      this.users$.subscribe(users => {
        subscriber.next(users.find(u => u.id === id));
      });
    });
  }

  updateUser(user: User): void {
    const users = this.usersSubject.value;
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.usersSubject.next(users);
      localStorage.setItem('users', JSON.stringify(users.filter(u => !users.some(initial => initial.id === u.id))));
    }
  }

  deleteUser(id: number): void {
    const users = this.usersSubject.value.filter(u => u.id !== id);
    this.usersSubject.next(users);
  }
}
