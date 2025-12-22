import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" [ngClass]="type" *ngIf="show">
      {{ message }}
      <button (click)="close()">×</button>
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 5px;
      color: white;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .success { background: green; }
    .error { background: red; }
    .info { background: blue; }
    button {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  `]
})
export class ToastNotificationComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() show = false;

  close() {
    this.show = false;
  }
}
