import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/users';
  private tokenKey = 'travel_token';

  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));
  user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .get<any[]>(`${this.api}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (!users.length) throw new Error('Invalid credentials');

          const user = users[0];
          localStorage.setItem(this.tokenKey, 'fake-jwt-token');
          localStorage.setItem('user', JSON.stringify(user));

          this.isLoggedIn$.next(true);
          this.user$.next(user);
          return user;
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(this.api, { name, email, password });
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn$.next(false);
    this.user$.next(null);
    this.router.navigate(['/']);
  }

  getUser() {
    return this.user$.value || JSON.parse(localStorage.getItem('user')!);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserName() {
  const user = this.user$.value || JSON.parse(localStorage.getItem('user')!);
  return user?.name || 'Guest';
}

}
