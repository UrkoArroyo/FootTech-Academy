import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const users = inject(UsersService);

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  return users.getMe().pipe(
    map((user) => {
      if (user?.role === 'admin') {
        return true;
      }
      router.navigate(['/dashboard']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/dashboard']);
      return of(false);
    }),
  );
};
