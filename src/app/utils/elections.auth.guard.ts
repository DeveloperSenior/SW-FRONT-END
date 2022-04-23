import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppProperties } from './elections.util';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ElectionsStorageService } from '../shared/services/elections.storge.service';

@Injectable()
export class ElectionsAuthGuard implements CanActivate {

    appProperties: AppProperties;

    constructor(
        private router: Router,
        private storage: ElectionsStorageService,
        public cookie: CookieService,
        public translateService: TranslateService,
        public snackBar: MatSnackBar) {
        this.appProperties = new AppProperties();
    }

    loadUserSession(): boolean {
        const session: any = this.storage.getSession();
        if (session !== null && session !== undefined) {
            const { secureToken } = session;
            return secureToken !== undefined && secureToken !== null && secureToken !== '*';
        } else {
            return false;
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loadUserSession()) {

           /*this.resources = JSON.parse(atob(this.cookie.get('menu-' + this.appProperties.app)));
            console.log(state.url);
            if (state.url !== '/' && state.url !== '/login' && state.url !== '/home') {
                const filteredResource = this.resources.filter(resource => resource.uri === state.url);
                if (filteredResource && filteredResource.length > 0) {
                    return true;
                } else {
                    this.showMessage(this.getMessageFromKey('generic.messages.not_allow_resource'), 'OK');
                    this.router.navigate(['home']);
                }
                return false;
            }else{
                return true;
            }*/
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    showMessage(message: string, action: string, config?: MatSnackBarConfig, callback?: () => void) {
        if (this.snackBar === null) {
            console.error('No MatSnackBar reference injected.');
            return;
        }
        const snackBarRef = this.snackBar.open(message, action, config);
        if (snackBarRef != null && callback) {
            snackBarRef.afterDismissed().subscribe(() => {
                callback();
            });
        }
    }

    getMessageFromKey(key: string) {
        if ((key != null && key !== '') || this.translateService != null) {
            return this.translateService.instant(key);
        }
        console.log('Invalid key or translate service.', key, this.translateService);
        return '';
    }
}
