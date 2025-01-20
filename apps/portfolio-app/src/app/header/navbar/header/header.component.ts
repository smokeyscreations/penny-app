import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../navbar.component";

@Component({
  selector: 'app-header',
  imports: [ NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
