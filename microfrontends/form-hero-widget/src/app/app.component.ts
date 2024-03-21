import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IHero } from './models/hero.model';
import { HeroService } from './services/hero.service';
import { Config } from './models/config.model';
import { config } from './environment/environment';


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
  styleUrls: ["../styles.css", './app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {
  @Input() config: Config | string;

  public page_code: string;
  
  title = 'form-hero-widget';
  public heroForm: FormGroup<HeroForm> = new FormGroup<HeroForm>({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl(),
  });


  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
      this.setConfig();
  }


  public saveNewHero(): void {
    this.heroService
      .addNewHero((this.heroForm.getRawValue() as IHero))
      .subscribe((newHero: IHero) => {
        console.log(newHero);
      });
  }


  private setConfig() {
    if (typeof this.config === 'string') {
      this.config = JSON.parse(this.config);
    } else {
      this.config = config;
    }

    this.heroService.url = (this.config as Config).systemParams.api['hero-api'].url;
    this.page_code = (this.config as Config).contextParams.page_code;
    console.log(this.config)
  }



}
