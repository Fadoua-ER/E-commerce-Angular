import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" *ngIf="show">
      <div class="dialog">
        <p>{{ message }}</p>
        <button (click)="confirm()">Yes</button>
        <button (click)="cancel()">No</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dialog {
      background: white;
      padding: 20px;
      border-radius: 5px;
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() show = false;
  @Input() message = '';
  @Output() confirmed = new EventEmitter<boolean>();

  confirm() {
    this.confirmed.emit(true);
    this.show = false;
  }

  cancel() {
    this.confirmed.emit(false);
    this.show = false;
  }
}
