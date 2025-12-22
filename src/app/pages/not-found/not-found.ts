import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/user/home">Go Home</a>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 50px;
    }
  `]
})
export class NotFoundComponent {}
