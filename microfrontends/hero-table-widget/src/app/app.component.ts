import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IApiClaim } from './models/api-claim.model';
import { mediatorInstance } from '@entando/mfecommunication';
import { IHero } from './models/hero.model';
import { HeroService } from './services/hero.service';
import { mfeconfig } from './environments/environment';
import { KeycloakService } from './services/keycloak.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss', './app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() config!: IApiClaim | string;
  private onDestroy$: Subject<void> = new Subject();

  public heroes: Array<IHero> = [];

  constructor(
    private heroService: HeroService,
    private keycloakService: KeycloakService,
    private ngZone: NgZone // EntandoTips
  ) {
    mediatorInstance.subscribe('updateHeroTable', {
      callerId: 'updateHeroTableSubscriber',
      callback: () => this.ngZone.run(() => this.getHeroes()), // EntandoTips
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

      console.log(this.config)
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
