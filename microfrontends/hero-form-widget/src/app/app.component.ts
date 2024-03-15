import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', './app.component.css']
})
export class AppComponent {
  title = 'hero-form-widget';

  heroForm: FormGroup = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    superPower: new FormControl()
  })


  saveNewHero() {
    console.log(this.heroForm.value)
  }
}
