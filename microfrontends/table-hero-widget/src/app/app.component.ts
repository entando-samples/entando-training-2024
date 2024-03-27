import { Component, Input, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IHero } from './models/hero.model';
import { Config } from './models/config.model';
import { mfeConfig } from './environment/environment';
import { HeroService } from './services/hero.service';
import { KeycloakService } from './services/keycloak.service';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { mediatorInstance } from '@entando/mfecommunication';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() config: Config | string;


  public heroes: Array<IHero> = [];

  private ondestroy$: Subject<void> = new Subject();

  constructor(private heroService: HeroService, private keycloakService: KeycloakService, private ngZone: NgZone) {
    
  }

  ngOnInit(): void {
     this.setConfig();

     this.keycloakService.instance$
     .pipe(
      takeUntil(this.ondestroy$),
      filter(keycloak => keycloak.initialized),
      take(1)
     ).subscribe(() => {
       this.getHeroes(); 
     })

     mediatorInstance.subscribe('heroAdded', {
      callerId: 'table-hero-widget',
      callback: (hero) => {
        // this.ngZone.run(() => {
          console.log(hero);
          this.getHeroes();
        // })
      }
    })
  }

  ngOnDestroy(): void {
      this.ondestroy$.next()
      this.ondestroy$.complete()

      mediatorInstance.unsubscribe('heroAdded', 'table-hero-widget');
  }

  private getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    })
  }


  private setConfig() {
    if (typeof this.config === 'string') this.config = JSON.parse(this.config);
    else this.config = mfeConfig;

    this.heroService.baseURL = (this.config as Config).systemParams.api['hero-api'].url;
  }

}
