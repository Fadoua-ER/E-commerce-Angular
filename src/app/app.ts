import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header';
import { FooterComponent } from './core/footer/footer';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      --header-height: 72px;
      --footer-height: 80px;
      display: block;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .main-content {
      display: block;
      min-height: calc(100vh - var(--header-height) - var(--footer-height));
      // padding: 24px 0;
      padding-top: calc(var(--header-height) + 16px);
      padding-bottom: calc(var(--footer-height) + 16px);
    }
  `]
})
export class App implements OnInit {
  ngOnInit() {
    // Any init logic
  }
}
