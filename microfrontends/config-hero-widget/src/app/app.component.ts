import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @Input() config!: { city: string } | string;

  ngOnInit() {
    console.log('config', this.config);
    this.setConfig();
  }


  public onCityChange(event: Event) {
    console.log('city', event);
    this.config = { city: (event.target as HTMLInputElement)?.value }
    console.log(this.config)
  }

  private setConfig() {
   if (typeof this.config === 'string') this.config = JSON.parse(this.config);
  }
}
