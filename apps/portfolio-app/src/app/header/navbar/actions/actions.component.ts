import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { User } from '../../../users/user.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../store/user-store/user.selector';
import { logout } from '../../../store/user-store/user.actions';
import { AsyncPipe } from '@angular/common';
import { UserPopoverComponent } from "../user-popover/user-popover/user-popover.component";

@Component({
  selector: 'app-actions',
  imports: [ButtonModule, RouterLink, AsyncPipe, UserPopoverComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent implements OnInit{

  user$!: Observable<User | null>;
  showMenu = false;

  constructor(private store: Store) {}
  ngOnInit() {
    this.user$ = this.store.select(selectCurrentUser);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.store.dispatch(logout());
    window.location.reload();
  }
  buttonToken = {
    'border.radius': '32px',
    'primary.background': '#ffb300',
    'primary.border.color': '#ffb300',
    'primary.color': 'black',
    'primary.hover.color': 'black',
    'primary.hover.background': '#fba221',
    'primary.hover.border.color': '#ffb300',
    'primary.active.background': 'white',
    'primary.active.color': 'black',
  }

  loginButtonToken = {
    'border.radius': '32px',
    'primary.background': 'none',
    'primary.border.color': 'transparent',
    'primary.color': 'white',
    'primary.hover.color': 'black',
    'primary.hover.background': '#ffb300',
    'primary.hover.border.color': '#ffb300',
    'primary.active.color': 'black',
    'primary.active.background': '#fba221',
    'padding.x': '24px'

  }

}
