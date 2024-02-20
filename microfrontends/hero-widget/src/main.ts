import 'zone.js';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
// import { SecurityInterceptor } from './app/interceptor/security.interceptor';
import { importProvidersFrom } from '@angular/core';

(async () => {
  const app = await createApplication({
    providers: [
      importProvidersFrom(HttpClientModule),
      // {
      //   provide: HTTP_INTERCEPTORS,
      //   useClass: SecurityInterceptor,
      //   multi: true,
      // },
    ],
  });

  const element = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('hero-widget', element);
})();
