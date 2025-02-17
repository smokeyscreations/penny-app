import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { initialMenuItems } from './menu-items.model';
import { MenuItem } from 'primeng/api';
import { ActionsComponent } from "./actions/actions.component";
import { Router } from '@angular/router';
import { RedirectService } from '../../shared/button/redirect.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    ActionsComponent
],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  constructor(private router: Router, private redirectService: RedirectService) {}
  
  menuItems = signal<MenuItem[]>(initialMenuItems);

  setRedirectUrl(){
    const currentUrl = this.router.url;
    this.redirectService.setRedirectUrl(currentUrl);
  }
  
  menuBarTokens = {
    background: 'none',
    color: '#000000',
    'border.color': 'none',
    padding: '0.5rem',
    'item.color': 'white',
    'item.focus.background': '#ffb300',
    'item.active.background': '#e0e0e0',
    'item.padding': '0.25rem 0.75rem',
  };

  
  
}

