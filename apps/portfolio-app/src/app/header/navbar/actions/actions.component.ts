import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-actions',
  imports: [ButtonModule, RouterLink],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
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

  }

}
