import { Component, inject, Signal, signal } from '@angular/core';
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
  public me: Signal<UserProfile | null> = toSignal(this.usersSvc.getMe(), { initialValue: null });

  public showDeleteModal = signal(false);
  public selectedToDelete = signal<UserProfile | null>(null);
  public deleting = signal(false);

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
    this.usersSvc.delete(id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.users = toSignal(this.usersSvc.getAll(), { initialValue: [] });
      },
      error: () => this.deleting.set(false),
    });
  }
} 
