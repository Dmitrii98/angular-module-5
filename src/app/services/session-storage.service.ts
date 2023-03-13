import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {
    constructor(@Inject('WINDOW') private window: Window) {}

    setToken(token: string): void {
        this.window.sessionStorage.setItem('token', token);
    }

    getToken(): string | null {
        return this.window.sessionStorage.getItem('token');
    }

    deleteToken(): void {
        this.window.sessionStorage.removeItem('token');
    }
}