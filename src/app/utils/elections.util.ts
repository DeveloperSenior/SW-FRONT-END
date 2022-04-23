
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export const TYPE_ID_BUSINESS: string [] = ['NIT', 'RUT', 'RUC'];

export class AppProperties {
    app: string = 'Elecciones Web';
    developer: string = 'Andres Escobar';
    version: string = 'v1.0.0';
    environment: string = environment.production ? 'P' : 'D';
    yearCopy: number = new Date().getFullYear();
    releaseDate: string ;
    broadcastProtocol: string;
    broadcastServer: string;
    broadcastPort: string;
}

export class TranslateProperties {
    http: HttpClient;
    constructor(httpClient: HttpClient) {
        this.http = httpClient;
    }
    getAvailableLanguage(): Promise < any > {
        const JSON = '../assets/res/translate.languages.json';
        return new Promise ( ( resolve, reject  ) => {
                              this.http.get(JSON)
                              .subscribe( data => {
                                resolve( data );
                              }, ( error ) => {
                                reject( error );
                              });
                              }
                            );
        }
}

export interface Language {
  code: string;
  name: string;
  icon: string;
  default: boolean;
}

export const SMART_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
