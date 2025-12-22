import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'USER') {
      return true;
    }
    if (user && user.role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
