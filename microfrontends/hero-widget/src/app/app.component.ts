import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { HeroService } from './services/hero.service';
import { IApiClaim } from './models/api-claim.model';
import { mfeconfig } from './environments/environment';
import { IHero } from './models/hero.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { mediatorInstance } from '@entando/mfecommunication';

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

  public heroForm: FormGroup = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl(),
  });

  constructor(private heroService: HeroService) {}

  public ngOnInit(): void {
    this.setConfig();
    this.pageCode = (this.config as IApiClaim).contextParams.page_code;
  }

  public saveNewHero(): void {
    this.heroService
      .addNewHero(this.heroForm.value)
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
