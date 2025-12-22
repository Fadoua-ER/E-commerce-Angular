import { Component } from '@angular/core';
import { SpinnerComponent } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-loading',
  imports: [SpinnerComponent],
  template: `
    <div class="loading">
      <app-spinner></app-spinner>
      <p>Loading...</p>
    </div>
  `,
  styles: [`
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50vh;
    }
  `]
})
export class LoadingComponent {}
