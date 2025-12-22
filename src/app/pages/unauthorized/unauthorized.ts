import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink],
  template: `
    <div class="unauthorized">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <a routerLink="/user/home">Go Home</a>
    </div>
  `,
  styles: [`
    .unauthorized {
      text-align: center;
      padding: 50px;
    }
  `]
})
export class UnauthorizedComponent {}
