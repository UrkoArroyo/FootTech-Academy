import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UsersService, UserProfile } from '../../core/services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private users = inject(UsersService);

  public user: Signal<UserProfile | null> = toSignal(this.users.getMe(), { initialValue: null });

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
