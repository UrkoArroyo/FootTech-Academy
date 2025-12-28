import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UsersService, UserProfile } from '../../core/services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css'],
})
export class UserDetailComponent {
  private users = inject(UsersService);
  private route = inject(ActivatedRoute);

  private id = Number(this.route.snapshot.paramMap.get('id'));
  public user: Signal<UserProfile | null> = toSignal(this.users.getById(this.id), {
    initialValue: null,
  });
}
