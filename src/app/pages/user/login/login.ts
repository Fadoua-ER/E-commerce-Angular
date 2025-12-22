import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ToastNotificationComponent } from '../../../shared/toast-notification/toast-notification';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink, SpinnerComponent, ToastNotificationComponent],
  template: `
    <div class="app-container text-center">
      <div class="card" style="max-width: 400px; margin: 0 auto;">
        <h2>Login</h2>
        <form (ngSubmit)="login()">
          <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required class="form-input" />
          <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required class="form-input" />
          <button type="submit" class="btn" [disabled]="loading">Login</button>
        </form>
        <p>Don't have an account? <a routerLink="/register">Register</a></p>
        <p>Admin? <a routerLink="/admin-login">Admin Login</a></p>
        <app-spinner *ngIf="loading"></app-spinner>
        <app-toast-notification [message]="toastMessage" [type]="toastType" [show]="showToast"></app-toast-notification>
      </div>
    </div>
  `,
  styles: [`
    .form-input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    p {
      margin: 10px 0;
    }
    a {
      color: #000;
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
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
        if (user) {
          this.router.navigate(['/user/home']);
        } else {
          this.showToastMessage('Invalid credentials', 'error');
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
