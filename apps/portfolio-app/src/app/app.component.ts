import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/navbar/header/header.component";
import { HeroComponent } from "./hero/hero.component";
import { PrimeNG } from 'primeng/config';
import MyPreset from './themes/mypreset';

@Component({
  imports: [RouterModule, HeaderComponent, HeroComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio-app';
    
}




