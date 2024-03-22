
import 'zone.js';
import {createCustomElement} from '@angular/elements';
import {createApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SecurityInterceptor } from './app/interceptors/security.interceptor';

(async () => {
  const app = await createApplication({
    providers: [
      importProvidersFrom(HttpClientModule),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: SecurityInterceptor,
        multi: true,
      },
    ]
  });

  const element = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('form-hero-widget', element);
})();

