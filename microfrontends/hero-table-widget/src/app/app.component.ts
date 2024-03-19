import {CUSTOM_ELEMENTS_SCHEMA, Component, Input, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import { mfeConfig } from '../environment/environment';
import { HeroService } from './services/hero.service';
import {IHero} from "./models/hero.model";
import { KeycloakService } from './services/keycloak.service';
import { mediatorInstance } from '@entando/mfecommunication';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit {
  @Input() config: any;
  heroes: IHero[];

  constructor(private heroService: HeroService, private keycloakService: KeycloakService, private ngZone: NgZone) {
    mediatorInstance.subscribe('updateHeroList', {
      callerId: 'hero-table-widget',
      callback: () => {
        this.ngZone.run(() => {
          this.fetchHeroes();
        })
      }
    })
  }

  public ngOnInit(): void {
    this.setConfig();
    this.keycloakService.instance$.subscribe((keycloak) => {
      console.log(keycloak)
      if (keycloak.initialized) {
        this.fetchHeroes();
      }
    })
  }

  private setConfig() {
    if (this.config) {
      this.config = JSON.parse(this.config);
    }  else {
      this.config = mfeConfig;
    }
    this.heroService.baseUrl = this.config.systemParams.api['hero-api'].url;
  }

  private fetchHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    })
  }
}
