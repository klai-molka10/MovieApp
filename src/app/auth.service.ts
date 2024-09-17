import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userId: string | null = null;

  setUser(userId: string): void {
    this.userId = userId;
    this.isAuthenticatedSubject.next(true); // Notify components of login
  }

  getUser(): string | null {
    return this.userId;
  }

  isAuthenticated(): boolean {
    return this.userId !== null;
  }

  logout(): void {
    this.userId = null;
    this.isAuthenticatedSubject.next(false); // Notify components of logout
  }
}
