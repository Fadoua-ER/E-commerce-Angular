import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // If user is authenticated and an admin -> allow
    if (this.authService.isAuthenticated()) {
      if (this.authService.isAdmin()) {
        return true;
      }
      // Authenticated but not admin -> show unauthorized
      this.router.navigate(['/unauthorized']);
      return false;
    }
    // Not authenticated -> redirect to admin login
    this.router.navigate(['/admin-login']);
    return false;
  }
}
