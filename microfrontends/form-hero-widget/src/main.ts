import 'zone.js';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


(async () => {

  const app = await createApplication({
    providers: [
      importProvidersFrom(HttpClientModule)
    ]
  })


  const element = createCustomElement(AppComponent, {
    injector: app.injector
  })


  customElements.define('form-hero-widget', element)
})()