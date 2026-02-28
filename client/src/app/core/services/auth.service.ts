import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl + '/users';

    currentUser = signal<any>(null);

    constructor(private http: HttpClient, private router: Router) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            this.currentUser.set(JSON.parse(userInfo));
        }
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(res => {
                localStorage.setItem('userInfo', JSON.stringify(res));
                this.currentUser.set(res);
            })
        );
    }

    register(name: string, email: string, password: string) {
        return this.http.post<any>(this.apiUrl, { name, email, password }).pipe(
            tap(res => {
                localStorage.setItem('userInfo', JSON.stringify(res));
                this.currentUser.set(res);
            })
        );
    }

    logout() {
        localStorage.removeItem('userInfo');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }
}
