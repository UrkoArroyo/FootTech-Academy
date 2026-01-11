import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService, UserProfile } from '../../core/services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent implements OnInit {
  private usersSvc = inject(UsersService);
  private _users = signal<UserProfile[]>([]);
  private _me = signal<UserProfile | null>(null);
  public users = this._users.asReadonly();
  public me = this._me.asReadonly();

  public showDeleteModal = signal(false);
  public selectedToDelete = signal<UserProfile | null>(null);
  public deleting = signal(false);

  ngOnInit(): void {
    forkJoin({
      me: this.usersSvc.getMe(),
      allUsers: this.usersSvc.getAll(),})
      .subscribe({
        next: ({ me, allUsers }) => {
          this._me.set(me);
          this._users.set(allUsers);
        },
      });
  }

  openDeleteModal(user: UserProfile) {
    this.selectedToDelete.set(user);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.selectedToDelete.set(null);
    this.deleting.set(false);
  }

  confirmDelete() {
    const id = this.selectedToDelete()?.id;
    if (!id) return;
    this.deleting.set(true);
    this.usersSvc
      .delete(id)
      .pipe(switchMap(() => this.usersSvc.getAll()))
      .subscribe({
        next: (allUsers) => {
          this.closeDeleteModal();
          this._users.set(allUsers);
        },
        error: () => this.deleting.set(false),
      });
  }
}
