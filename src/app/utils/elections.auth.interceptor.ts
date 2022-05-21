import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ElectionsStorageService } from '../shared/services/elections.storge.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class AuthInterceptor extends ElectionsStorageService implements HttpInterceptor {
    userSession: any;
    private countRequest = 0;
    @BlockUI() blockUI!: NgBlockUI;
    constructor() {
        super();
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.countRequest) {
            this.blockUI.start()
        }
        this.countRequest++
        this.userSession = this.getSession();
        const token = (this.userSession == null
            || this.userSession === undefined
            || this.userSession === '*' ? '*' : this.userSession.secureToken);
        const headers = req.clone({
            headers: req.headers.set('Authorization', `${token}`)
        });
        return next.handle(headers).pipe(
            finalize(() => {
                this.countRequest--;
                if (!this.countRequest) {
                    this.blockUI.stop()
                }

            })
        );
    }


}
