import { Component, Input, OnInit } from '@angular/core';
import { IHero } from './models/hero.model';
import { Config } from './models/config.model';
import { mfeConfig } from './environment/environment';
import { HeroService } from './services/hero.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css']
})
export class AppComponent implements OnInit {
  @Input() config: Config | string;


  public heroes: Array<IHero> = [];

  constructor(private heroService: HeroService) {

  }

  ngOnInit(): void {
     this.setConfig();
     this.getHeroes(); 
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
