import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http/http';
import { Observable } from 'rxjs';
import { UserService } from '@app/shared/user/user.service';
import { environment } from 'src/environments/environment';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authToken = this.userService.getAuthToken();
        console.log('intercept');
        console.log(req.url);

        if (req.url.includes(environment.API_URL) && authToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + authToken)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
