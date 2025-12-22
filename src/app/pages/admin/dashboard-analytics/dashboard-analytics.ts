import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-analytics',
  imports: [CommonModule],
  template: `
    <div class="dashboard-analytics">
      <h2>Analytics</h2>
      <p>Analytics dashboard coming soon.</p>
    </div>
  `,
  styles: [`
    .dashboard-analytics {
      padding: 20px;
    }
  `]
})
export class DashboardAnalyticsComponent {}
