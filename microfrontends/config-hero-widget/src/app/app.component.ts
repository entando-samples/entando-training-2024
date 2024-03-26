import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @Input() config: {city: string} | string;


  ngOnInit(): void {
      this.setConfig()
  }

  public onCityChange(event: Event): void {
    this.config = { city: (event.target as HTMLInputElement).value }
  }
  

  private setConfig() {
    if(typeof this.config === 'string') this.config = JSON.parse(this.config)
  }
}
