import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js';


(async () => {
  const app = await createApplication(appConfig);


  const element = createCustomElement(AppComponent, {injector: app.injector})

  customElements.define('hero-form-widget', element)
})();

