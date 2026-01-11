import { Component, inject, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';
import { UsersService, UserProfile } from '../../core/services/users.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private router = inject(Router);
  private users = inject(UsersService);
  private _isAuthenticatedSubscription: Subscription | null = null;
  private _isAuthenticated = signal(false);
  private _user = signal<UserProfile | null>(null);

  public isAuthenticated = this._isAuthenticated.asReadonly();
  public user: Signal<UserProfile | null> = this._user.asReadonly();

  ngOnInit(): void {
    this._isAuthenticatedSubscription = this.auth.isAuthenticated$.subscribe((isAuth) => {
      this._isAuthenticated.set(isAuth);
      if (isAuth) {
        this.users.getMe().subscribe((profile) => {
          this._user.set(profile);
        });
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate([''], { replaceUrl: true });
  }

  ngOnDestroy(): void {
    this._isAuthenticatedSubscription?.unsubscribe();
  }
}
