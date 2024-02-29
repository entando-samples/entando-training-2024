import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { HeroService } from './services/hero.service';
import { IApiClaim } from './models/api-claim.model';
import { mfeconfig } from './environments/environment';
import { IHero } from './models/hero.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { mediatorInstance } from '@entando/mfecommunication';

interface HeroForm {
  name: FormControl<string>;
  city: FormControl<string>;
  superPower: FormControl<string>;

}
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'hero-widget',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss', './app.component.scss'],
  imports: [ReactiveFormsModule],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit {
  @Input() config!: IApiClaim | string;
  public pageCode!: string;

  public heroForm: FormGroup<HeroForm> = new FormGroup<HeroForm>({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl(),
  });

  constructor(private heroService: HeroService) {}

  public ngOnInit(): void {
    this.setConfig();
    this.pageCode = (this.config as IApiClaim).contextParams.page_code;
    this.heroForm.controls.city.setValue((this.config as IApiClaim).params.city);
    this.heroForm.controls.city.disable();
  }

  public saveNewHero(): void {
    this.heroService
      .addNewHero((this.heroForm.getRawValue() as IHero))
      .subscribe((newHero: IHero) => {
        mediatorInstance.publish('updateHeroTable');
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
