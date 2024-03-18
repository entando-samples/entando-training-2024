import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @Input() config!: { city: string } | string;

  title = 'simple-mfe-config';

  ngOnInit() {
    this.setConfig();
  }

  private setConfig() {
    if (typeof this.config === 'string') this.config = JSON.parse(this.config);
  }

  onCityChange(e: Event) {
    console.log('changing city', e.target)
    this.config = { city: (e.target as HTMLInputElement).value };
    console.log('changed city', this.config)
  }
}
