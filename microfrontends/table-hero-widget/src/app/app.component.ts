import { Component } from '@angular/core';
import { IHero } from './models/hero.model';
import { HeroService } from './services/hero.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css','./app.component.css']
})
export class AppComponent {
  public heroes: Array<IHero> = [
    { name: 'Superman', city: 'Metropolis', superPower: 'Super strength' },
  ];

  constructor(private heroService: HeroService) {
    //this.getHeroes();
  }

  private getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes: Array<IHero>) => {
      this.heroes = heroes;
    });
  }

}
