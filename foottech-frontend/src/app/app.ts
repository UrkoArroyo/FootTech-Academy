import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
