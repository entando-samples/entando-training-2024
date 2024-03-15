import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { mfeConfig } from '../environment/environment';
import { HeroService } from './services/hero.service';
import { HttpClientModule } from '@angular/common/http';
import { Config } from './models/config.model';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css']
})
export class AppComponent implements OnInit {
  @Input() config: Config | string;

  title = 'hero-form-widget';

  constructor(private heroService: HeroService) {}

  heroForm: FormGroup = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl()
  })

  public ngOnInit(): void {
    console.log('PRE config', this.config)
    this.setConfig();
    console.log('POST config', this.config)
    if ((this.config as Config).params.city) {
      console.log('inside IF', this.config)
      this.heroForm.controls.city.setValue((this.config as Config).params.city)
    }
  }


  saveNewHero() {
    this.heroService.saveHero(this.heroForm.value).subscribe((hero) => {
      console.log('Hero saved', hero);
    })
  }


  private setConfig() {
    if (this.config) {
      this.config = JSON.parse(this.config as string);
    }  else {
      this.config = mfeConfig as Config;
    }
    this.heroService.baseUrl = (this.config as Config).systemParams.api['hero-api'].url;
  }
}
