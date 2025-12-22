import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  imports: [CommonModule],
  template: `
    <div class="rating">
      <span *ngFor="let star of stars" class="star" [class.filled]="star <= rating">★</span>
    </div>
  `,
  styles: [`
    .rating {
      display: inline-block;
    }
    .star {
      color: #ddd;
      font-size: 20px;
    }
    .star.filled {
      color: gold;
    }
  `]
})
export class RatingStarsComponent {
  @Input() rating = 0;
  stars = [1, 2, 3, 4, 5];
}
