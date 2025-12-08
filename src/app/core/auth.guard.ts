import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private tokenKey = 'travel_token';
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<{ token: string }> {
    // mock login: accept any email/password for demo
    const fakeToken = btoa(`${email}:${password}`);
    localStorage.setItem(this.tokenKey, fakeToken);
    this._isLoggedIn.next(true);
    return of({ token: fakeToken });
  }

  register(name: string, email: string, password: string): Observable<any> {
    // mock register: just return success
    return of({ success: true });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn.next(false);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
