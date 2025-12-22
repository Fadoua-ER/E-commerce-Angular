import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div class="user-detail">
      <h2>User Details</h2>
      <div *ngIf="user">
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Role: {{ user.role }}</p>
      </div>
      <app-spinner *ngIf="loading"></app-spinner>
    </div>
  `,
  styles: [`
    .user-detail {
      padding: 20px;
    }
  `]
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  loading = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }
}
