/**
 * Angular CLI
 */
 import { BrowserModule } from '@angular/platform-browser';
 import { NgModule } from '@angular/core';
 import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
 import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
 import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElectionsUtilsService } from './shared/services/elections.util.service';
import { CookieService } from 'ngx-cookie-service';
import { ElectionsAuthGuard } from './utils/elections.auth.guard';
import { AuthInterceptor } from './utils/elections.auth.interceptor';
import { BlockUIModule } from 'ng-block-ui';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BlockUIModule.forRoot( {
      message: 'Procesando'
    } ),
  ],
  providers: [ElectionsUtilsService, CookieService, ElectionsAuthGuard,
   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
