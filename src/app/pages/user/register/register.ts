import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ToastNotificationComponent } from '../../../shared/toast-notification/toast-notification';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink, SpinnerComponent, ToastNotificationComponent],
  template: `
    <div class="app-container text-center">
      <div class="card" style="max-width: 400px; margin: 0 auto;">
        <h2>Register</h2>
        <form (ngSubmit)="register()">
          <input type="text" [(ngModel)]="name" name="name" placeholder="Name" required class="form-input" />
          <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required class="form-input" />
          <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required class="form-input" />
          <button type="submit" class="btn" [disabled]="loading">Register</button>
        </form>
        <p>Already have an account? <a routerLink="/login">Login</a></p>
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
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  loading = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.loading = true;
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/user/home']);
      },
      error: () => {
        this.loading = false;
        this.showToastMessage('Registration failed', 'error');
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
