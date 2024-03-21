import 'zone.js';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

(async () => {
  const app = await createApplication({
    providers: [],
  });

  const element = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('simple-mfe-config', element);
})();