import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ToastNotificationComponent } from '../../../shared/toast-notification/toast-notification';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, SpinnerComponent, ToastNotificationComponent],
  template: `
    <div class="profile">
      <h2>My Profile</h2>
      <form (ngSubmit)="updateProfile()">
        <input type="text" [(ngModel)]="user.name" name="name" placeholder="Name" required />
        <input type="email" [(ngModel)]="user.email" name="email" placeholder="Email" required />
        <button type="submit" [disabled]="loading">Update</button>
      </form>
      <app-spinner *ngIf="loading"></app-spinner>
      <app-toast-notification [message]="toastMessage" [type]="toastType" [show]="showToast"></app-toast-notification>
    </div>
  `,
  styles: [`
    .profile {
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
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
export class ProfileComponent implements OnInit {
  user: User = { id: 0, name: '', email: '', password: '', role: 'USER' };
  loading = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast = false;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = { ...currentUser };
    }
  }

  updateProfile() {
    this.loading = true;
    this.userService.updateUser(this.user);
    this.authService.updateCurrentUser(this.user);
    this.loading = false;
    this.showToastMessage('Profile updated', 'success');
  }

  private showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
