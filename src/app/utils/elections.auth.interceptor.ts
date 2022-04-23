import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectionsStorageService } from '../shared/services/elections.storge.service';

@Injectable()
export class AuthInterceptor extends ElectionsStorageService implements HttpInterceptor {
    userSession: any;
    constructor() {
        super();
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.userSession = this.getSession();
        const token = (this.userSession == null
            || this.userSession === undefined
            || this.userSession === '*' ? '*' : this.userSession.secureToken);
        const headers = req.clone({
            headers: req.headers.set('secureToken', `${token}`)
        });
        return next.handle(headers);
    }


}
