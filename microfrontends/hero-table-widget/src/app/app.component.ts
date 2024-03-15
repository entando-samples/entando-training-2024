import {CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit} from '@angular/core';
import { mfeConfig } from '../environment/environment';
import { HeroService } from './services/hero.service';
import {IHero} from "./models/hero.model";


@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css']
})
export class AppComponent implements OnInit {
  @Input() config: any;
  heroes: IHero[];

  constructor(private heroService: HeroService) {}

  public ngOnInit(): void {
    this.setConfig();
    this.fetchHeroes();
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
