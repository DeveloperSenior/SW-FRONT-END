import { Subject, Observable } from 'rxjs';

export class ElectionsUtilsService {

    private login = new Subject<boolean>();


    isLogin(): Observable <boolean>  {
        return this.login.asObservable();
    }

    setLogin(login: boolean) {
        this.login.next(login);
    }

}
