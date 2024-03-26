import { Component } from '@angular/core';
import { IHero } from './models/hero.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css']
})
export class AppComponent {
  title = 'table-hero-widget';
  public heroes: Array<IHero> = [{
    name: 'Batman',
    city: 'Gotham',
    superPower: 'Rich'
  }];
}
