import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly host = 'http://localhost:3000';
  private readonly base = `${this.host}/api/users`;

  constructor(private http: HttpClient) {}

  getMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.base}/me`);
  }

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.base}`);
  }

  getById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.base}/${id}`);
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.base}`, payload);
  }

  update(id: number, payload: any): Observable<UserProfile> {
    return this.http.patch<UserProfile>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  getEntrenadores(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.base}/entrenadores`);
  }

  getRelationByJugador(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}/relation`);
  }

  addEntrenador(idJugador: number, idEntrenador: number): Observable<any> {
    return this.http.patch<any>(`${this.base}/${idJugador}/entrenador/${idEntrenador}`, {});
  }

  removeEntrenador(idRelation: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/entrenador/${idRelation}`);
  }

  getJugadoresByEntrenador(id: number) {
    return this.http.get<UserProfile[]>(`${this.base}/entrenador/${id}/jugadores`);
  }
}
