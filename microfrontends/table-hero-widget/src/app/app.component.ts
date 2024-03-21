import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IHero } from './models/hero.model';
import { HeroService } from './services/hero.service';
import { Config } from './models/config.model';
import { config } from './environment/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css','./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {
  @Input() config: Config | string;
  public heroes: Array<IHero> = [
    { name: 'Superman', city: 'Metropolis', superPower: 'Super strength' },
  ];

  constructor(private heroService: HeroService) {
   
  }

  ngOnInit(): void {
      this.setConfig();
      this.getHeroes();
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


}
