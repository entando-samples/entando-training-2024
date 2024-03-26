import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Config } from './models/config.model';
import { mfeConfig } from './environment/environment';
import { HeroService } from './services/hero.service';
import { IHero } from './models/hero.model';


interface HeroForm {
  name: FormControl<string>;
  city: FormControl<string>;
  superPower: FormControl<string>;

}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css']
})
export class AppComponent implements OnInit {

  @Input() config: Config | string;

  title = 'form-hero-widget';

  public heroForm: FormGroup<HeroForm> = new FormGroup<HeroForm>({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl(),
  });


  constructor(private heroService: HeroService) {}


  public ngOnInit(): void {
    this.setConfig();   
  }

  public saveNewHero(): void {
    this.heroService.createHero(this.heroForm.value as IHero)
      .subscribe((hero) => {
        console.log(hero);
      })
  }


  private setConfig() {
    if (typeof this.config === 'string') this.config = JSON.parse(this.config);
    else this.config = mfeConfig;

    this.heroService.baseURL = (this.config as Config).systemParams.api['hero-api'].url;
  }


  
}
