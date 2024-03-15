import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { mfeConfig } from '../environment/environment';
import { HeroService } from './services/hero.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css']
})
export class AppComponent implements OnInit {
  @Input() config: any;

  title = 'hero-form-widget';

  constructor(private heroService: HeroService) {}

  heroForm: FormGroup = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl()
  })

  public ngOnInit(): void {
    this.setConfig();     
  }


  saveNewHero() {
    this.heroService.saveHero(this.heroForm.value).subscribe((hero) => {
      console.log('Hero saved', hero);
    })
  }


  private setConfig() {
    if (this.config) {
      this.config = JSON.parse(this.config);
    }  else {
      this.config = mfeConfig;
    }
    this.heroService.baseUrl = this.config.systemParams.api['hero-api'].url;
  }
}
