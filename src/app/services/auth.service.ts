import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService
    ) {}

    login(username: string, password: string): Observable<any> {
        return this.http
            .post('/api/auth/login', { username, password })
            .pipe(tap((response) => this.handleAuthResponse(response)));
    }

    logout(): Observable<any> {
        return this.http
            .post('/api/auth/logout', null)
            .pipe(tap(() => this.handleLogout()));
    }

    register(username: string, password: string): Observable<any> {
        return this.http
            .post('/api/auth/register', { username, password })
            .pipe(tap((response) => this.handleAuthResponse(response)));
    }

    private handleAuthResponse(response: any): void {
        if (response.token) {
            this.sessionStorageService.setToken(response.token);
            this.isAuthorized$$.next(true);
        }
    }

    private handleLogout(): void {
        this.sessionStorageService.deleteToken();
        this.isAuthorized$$.next(false);
    }
}