import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from "./hero.component";
import { StartingPointComponent } from "./starting-point/starting-point.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroComponent, StartingPointComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
