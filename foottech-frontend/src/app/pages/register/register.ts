import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  loading = false;
  error: string | null = null;
  success = false;

  private initialCreatedAt = new Date().toISOString().slice(0,16);

  private users = inject(UsersService);
  private router = inject(Router);

  form = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    created_at: new FormControl(this.initialCreatedAt, { nonNullable: true, validators: [Validators.required] }),
    rol: new FormControl('jugador', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const raw = this.form.value as Record<string, any>;
    const payload: Record<string, any> = {
      nombre: raw['nombre'],
      password: raw['password'],
      created_at: raw['created_at'] ? new Date(raw['created_at']).toISOString() : new Date().toISOString(),
      rol: raw['rol'],
      email: raw['email']
    };

    this.users.register(payload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.success = true;
          // redirect or clear form
          setTimeout(() => this.router.navigate(['/']), 1200);
        },
        error: (err) => this.error = err?.error?.message || 'Registration failed'
      });
  }
}
