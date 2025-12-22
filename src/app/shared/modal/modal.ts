import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="show">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button (click)="close()">×</button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
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
    .modal {
      background: white;
      width: 80%;
      max-width: 500px;
      border-radius: 5px;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .modal-body {
      padding: 20px;
    }
  `]
})
export class ModalComponent {
  @Input() show = false;
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.show = false;
    this.closed.emit();
  }
}
