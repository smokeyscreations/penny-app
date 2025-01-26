import { ChangeDetectionStrategy, Component, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../../store/user-store/user.selector';
import { User } from '../../../../../app/users/user.model';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { Popover, PopoverModule } from 'primeng/popover';
import { Observable } from 'rxjs';
import * as UserActions from '../../../../store/user-store/user.actions';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api/menuitem';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-popover',
  imports: [ButtonModule, PopoverModule, InputGroupModule, MenuModule, InputTextModule, AsyncPipe],
  templateUrl: './user-popover.component.html',
  styleUrl: './user-popover.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPopoverComponent {

  @ViewChild('op') popover!: Popover;

  popoverOptions: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-home', 
      items: [
        {
          label: 'View profile',
          icon: 'pi pi-user',
        },
        {
          label: 'My portfolios',
          icon: 'pi pi-book',
          routerLink: 'my-portfolios',
          command: ()=> this.togglePopover,
        }
      ]
    },
    {
      separator: true 
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog', 
      items: [
        {
          label: 'Change Password',
          icon: 'pi pi-key',
          routerLink: 'change-password',
          command: ()=> this.togglePopover(),
        },
        {
          label: 'Edit preferences',
          icon: 'pi pi-palette',

        }
      ]
    },
    {
      separator: true 
    },
    {
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logout(),
        }
      ]
    }
  ];
  
  
  buttonDesignToken = {
    'border.radius': '6px',
    'primary.background': '#131C22',
    'primary.border.color': 'none',
    'primary.color': 'white',
    'primary.hover.color': 'white',
    'primary.hover.background': '#1C2933',
    'primary.hover.border.color': 'none',
    'primary.active.background': '#1C2933',
    'primary.active.color': '#BACBD9',
    'primary.active.border.color': 'none',
  };


  user$: Observable<User | null>;
  
  constructor(private store: Store, private router: Router) {
    this.user$ = this.store.select(selectCurrentUser);
  }
  viewProfile() {
    this.router.navigate(['/profile']);
  }

  togglePopover(event?: Event){

    if(event){
      this.popover.toggle(event);
    } else{
      this.popover.hide();
    }
   
  }


  viewPortfolios() {
    this.router.navigate(['/my-portfolios']);
  }

  logout() {
    this.store.dispatch(UserActions.logout());
    window.location.reload();
    this.popover.hide();
  }

 }

 
