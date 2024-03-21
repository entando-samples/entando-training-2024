import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IHero } from './models/hero.model';
import { HeroService } from './services/hero.service';


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
  styleUrls: ["../styles.css", './app.component.css']
})
export class AppComponent {
  
  title = 'form-hero-widget';
  public heroForm: FormGroup<HeroForm> = new FormGroup<HeroForm>({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl(),
  });


  constructor(private heroService: HeroService) {}


  public saveNewHero(): void {
    this.heroService
      .addNewHero((this.heroForm.getRawValue() as IHero))
      .subscribe((newHero: IHero) => {
        console.log(newHero);
      });
  }



}
