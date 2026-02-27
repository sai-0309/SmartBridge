import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const userInfoStr = localStorage.getItem('userInfo');
    let token = null;

    if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        token = userInfo.token;
    }

    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(cloned);
    }

    return next(req);
};
