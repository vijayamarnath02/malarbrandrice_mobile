// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    return next(req).pipe(
        tap({
            error: (error) => {
                if (error.status === 403) {
                    localStorage.clear();
                    router.navigate(['/']);
                }
                if (error.status === 500) {
                    router.navigate(['/oops']);
                }
            }
        })
    );
};
