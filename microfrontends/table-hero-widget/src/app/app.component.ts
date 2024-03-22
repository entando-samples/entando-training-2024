import { Component, Input, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IHero } from './models/hero.model';
import { HeroService } from './services/hero.service';
import { Config } from './models/config.model';
import { config } from './environment/environment';
import { KeycloakService } from './services/keycloak.service';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { mediatorInstance } from '@entando/mfecommunication';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css','./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() config: Config | string;
  public heroes: Array<IHero> = [];
  private destroy$ = new Subject<void>();

  constructor(
    private heroService: HeroService, 
    private keycloakService: KeycloakService,
    private ngZone: NgZone) {
   
  }

  ngOnInit(): void {
      this.setConfig();
      this.keycloakService.instance$
      .pipe(takeUntil(this.destroy$),
        filter((keycloak) => keycloak.initialized),
        take(1)
      )
      .subscribe((keycloak) => {
          this.getHeroes();
      });

      this.updateTableHero();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes: Array<IHero>) => {
      this.heroes = heroes;
    });
  }


  private setConfig() {
    if (typeof this.config === 'string') {
      this.config = JSON.parse(this.config);
    } else {
      this.config = config;
    }

    this.heroService.url = (this.config as Config).systemParams.api['hero-api'].url;
  }


  private updateTableHero() {
    mediatorInstance.subscribe('updateHeroList', {
      callerId: 'table-hero-widget',
      callback: () => {
        this.ngZone.run(() => {
          this.getHeroes();
        });
      }})
  }


}
