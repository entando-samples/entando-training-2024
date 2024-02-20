import {
  Component,
  Injector,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HeroService } from './services/hero.service';
import { IApiClaim } from './models/api-claim.model';
import { mfeconfig } from './environments/environment';
import { IHero } from './models/hero.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'hero-widget',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ReactiveFormsModule],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit {
  @Input() config!: IApiClaim | string;

  public heroes: Array<IHero> = [];
  public heroForm: FormGroup = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl(),
  });

  constructor(private heroService: HeroService) {}

  public ngOnInit(): void {
    this.setConfig();
    this.getHeroes();
  }

  public saveNewHero(): void {
    this.heroService
      .addNewHero(this.heroForm.value)
      .subscribe((newHero: IHero) => this.heroes.push(newHero));
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
