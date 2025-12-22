import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ToastNotificationComponent } from '../../../shared/toast-notification/toast-notification';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule, SpinnerComponent, ToastNotificationComponent],
  template: `
    <div class="admin-login">
      <h2>Admin Login</h2>
      <form (ngSubmit)="login()">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required />
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required />
        <button type="submit" [disabled]="loading">Login</button>
      </form>
      <app-spinner *ngIf="loading"></app-spinner>
      <app-toast-notification [message]="toastMessage" [type]="toastType" [show]="showToast"></app-toast-notification>
    </div>
  `,
  styles: [`
    .admin-login {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    input, button {
      margin: 10px 0;
      padding: 10px;
    }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';
  loading = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        if (user && user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.showToastMessage('Invalid admin credentials', 'error');
        }
      },
      error: () => {
        this.loading = false;
        this.showToastMessage('Login failed', 'error');
      }
    });
  }

  private showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
