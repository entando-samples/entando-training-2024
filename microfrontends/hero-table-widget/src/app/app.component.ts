import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IApiClaim } from './models/api-claim.model';
import { Mediator } from '@entando/mfecommunication';
import { IHero } from './models/hero.model';
import { HeroService } from './services/hero.service';
import { mfeconfig } from './environments/environment';
import { KeycloakService } from './services/keycloak.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss', './app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() config!: IApiClaim | string;
  private mediator: Mediator = new Mediator();
  private onDestroy$: Subject<void> = new Subject();

  public heroes: Array<IHero> = [];

  constructor(
    private heroService: HeroService,
    private keycloakService: KeycloakService
  ) {
    this.mediator.subscribe('updateHeroTable', {
      callerId: 'updateHeroTableSubscriber',
      callback: () => this.getHeroes(),
    });
  }

  public ngOnInit(): void {
    this.setConfig();
    this.keycloakService.instance$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((kcInstance) => {
        if (kcInstance.initialized) {
          this.getHeroes();
        }
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes: Array<IHero>) => {
      this.heroes = heroes;
    });
  }

  private setConfig() {
    if (this.config) {
      this.config = JSON.parse(this.config as string);
    } else {
      this.config = mfeconfig;
    }
    this.heroService.url = (this.config as IApiClaim).systemParams.api[
      'heroes-ms'
    ].url;
  }
}
