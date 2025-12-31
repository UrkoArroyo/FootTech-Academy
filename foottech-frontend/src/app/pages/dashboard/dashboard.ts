import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService, UserProfile } from '../../core/services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  private users = inject(UsersService);

  me: any = null;
  loading = signal(true);

  // For admin: entrenadores and their players
  entrenadoresWithJugadores: any = signal([]);
  // For entrenador: my players
  misJugadores: UserProfile[] = [];

  // For jugador: my entrenador and teammates
  miEntrenador: UserProfile | null = null;
  misCompaneros: UserProfile[] = [];

  ngOnInit(): void {
    this.users.getMe().subscribe((me) => {
      this.me = me;
      if (!me) {
        this.loading.set(false);
        return;
      }

      if (me.role === 'admin') {
        this.loadAdminView();
      } else if (me.role === 'entrenador') {
        this.loadEntrenadorView(me.id);
      } else if (me.role === 'jugador') {
        this.loadJugadorView(me.id);
      }
    });
  }

  loadAdminView() {
    this.loading.set(true);
    this.users.getEntrenadores().subscribe(
      (list) => {
        if (!list || list.length === 0) {
          this.loading.set(false);
          this.entrenadoresWithJugadores.set([])
          return;
        }

        // for each entrenador, fetch jugadores
        const results: Array<{ entrenador: UserProfile; jugadores: UserProfile[] }> = [];
        let remaining = list.length;
        list.forEach((e) => {
          this.users.getJugadoresByEntrenador(e.id).subscribe(
            (players) => {
              results.push({ entrenador: e, jugadores: players || [] });
              remaining -= 1;
              if (remaining === 0) {
                this.entrenadoresWithJugadores.set(results as any);
                this.loading.set(false);
              }
            },
            () => {
              remaining -= 1;
              if (remaining === 0) {
                this.entrenadoresWithJugadores.set(results as any);
                this.loading.set(false);
              }
            },
          );
        });
        this.loading.set(false);
      },
      () => (this.loading.set(false)) ,
    );
  }

  loadEntrenadorView(id: number) {
    this.loading.set(true);
    this.users.getJugadoresByEntrenador(id).subscribe(
      (players) => {
        this.misJugadores = players || [];
        this.loading.set(false);
      },
      () => (this.loading.set(false)),
    );
  }

  loadJugadorView(id: number) {
    this.loading.set(true);
    this.users.getRelationByJugador(id).subscribe(
      (rel) => {
        if (rel && rel.entrenador) {
          this.miEntrenador = rel.entrenador as UserProfile;
          this.users.getJugadoresByEntrenador(this.miEntrenador.id).subscribe(
            (players) => {
              this.misCompaneros = (players || []).filter((p) => p.id !== id);
              this.loading.set(false);
            },
            () => (this.loading.set(false)),
          );
        } else {
          this.miEntrenador = null;
          this.misCompaneros = [];
          this.loading.set(false);
        }
      },
      () => (this.loading.set(false)),
    );
  }
}
