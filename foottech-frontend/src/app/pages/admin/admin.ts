import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService, UserProfile } from '../../core/services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent {
  private usersSvc = inject(UsersService);
  public users: Signal<UserProfile[]> = toSignal(this.usersSvc.getAll(), { initialValue: [] });
} 
