import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
