import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderModule } from './shared/loader/loader.module';
import { AlertaModule } from './shared/alerta/alerta.module';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { HeaderImssPublicoComponent } from './components/header-imss-publico/header-imss-publico.component';
import { TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION } from './utils/tokens';
import { BnNgIdleService } from 'bn-ng-idle';
import { AutenticacionService } from './services/autenticacion.service';
import { AutenticacionInterceptor } from './interceptors/autenticacion.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NgOptimizedImage } from '@angular/common';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PaginaNoEncontradaComponent,
    HeaderImssPublicoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LoaderModule,
    AlertaModule,
    NgOptimizedImage
  ],
  providers: [
    AutenticacionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacionInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    BnNgIdleService,
    { provide: TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION, useValue: 300 }, // Tiempo en segundos
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
