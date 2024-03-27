import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Config } from './models/config.model';
import { mfeConfig } from './environment/environment';
import { HeroService } from './services/hero.service';
import { IHero } from './models/hero.model';
import { mediatorInstance } from '@entando/mfecommunication';

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
  styleUrls: ['../styles.css', './app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {

  @Input() config: Config | string;

  pageCode:string;

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
        mediatorInstance.publish('heroAdded', hero);
      })
  }


  private setConfig() {
    if (typeof this.config === 'string') this.config = JSON.parse(this.config);
    else this.config = mfeConfig;

    this.heroService.baseURL = (this.config as Config).systemParams.api['hero-api'].url;
    this.pageCode = (this.config as Config).contextParams.page_code;


    if ((this.config as Config).params?.city) {
      this.heroForm.controls.city.setValue((this.config as Config).params?.city)
    }

  }


  
}
