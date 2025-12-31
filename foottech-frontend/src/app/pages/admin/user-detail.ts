import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService, UserProfile } from '../../core/services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css'],
})
export class UserDetailComponent {
  private users = inject(UsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private id = Number(this.route.snapshot.paramMap.get('id'));
  public user: Signal<UserProfile | null> = toSignal(this.users.getById(this.id), {
    initialValue: null,
  });

  public isEdit = this.route.snapshot.url.map((s) => s.path).pop() === 'edit';

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl(''),
    role: new FormControl('jugador', { nonNullable: true, validators: [Validators.required] }),
    entrenadorId: new FormControl(null),
  });

  loading = false;
  error: string | null = null;

  // entrenador relation state
  entrenadores: Signal<UserProfile[]> = toSignal(this.users.getEntrenadores(), { initialValue: [] }); 
  relation: any | null = null;
  assigning = false;
  removingRelation = false;

  constructor() {
    // patch form when user loads
    this.users.getById(this.id).subscribe((u) => {
      if (u) {
        this.form.patchValue({ name: u.name, email: u.email, role: u.role });
        if (u.role === 'jugador') {
          this.loadRelation();
        }
      }
    });
  }


  loadRelation() {
    this.users.getRelationByJugador(this.id).subscribe(
      (r) => {
        this.relation = r || null;
        if (this.relation?.entrenador?.id) {
          this.form.patchValue({ entrenadorId: this.relation.entrenador.id });
        } else {
          this.form.patchValue({ entrenadorId: null });
        }
      },
      () => {
        this.relation = null;
      },
    );
  }

  assignEntrenador(entrenadorId: number | null | undefined) {
    if (entrenadorId == null) return;
    this.assigning = true;
    this.users.addEntrenador(this.id, entrenadorId).pipe(finalize(() => (this.assigning = false))).subscribe({
      next: () => this.loadRelation(),
      error: (err) => (this.error = err?.error?.message || 'Error assigning entrenador'),
    });
  }

  removeEntrenador() {
    if (!this.relation?.id) return;
    this.removingRelation = true;
    this.users.removeEntrenador(this.relation.id).pipe(finalize(() => (this.removingRelation = false))).subscribe({
      next: () => this.loadRelation(),
      error: (err) => (this.error = err?.error?.message || 'Error removing entrenador'),
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value as any;
    const payload: any = { name: raw.name, email: raw.email, role: raw.role };
    if (raw.password) payload.password = raw.password;

    this.loading = true;
    this.error = null;

    this.users.update(this.id, payload).pipe(finalize(() => (this.loading = false))).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: (err) => (this.error = err?.error?.message || 'Error updating user'),
    });
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
