import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css']
})
export class AppComponent {
  heroes = [
    {name: 'batman', city: 'gotham', superPower: 'money'},
  ]
}
