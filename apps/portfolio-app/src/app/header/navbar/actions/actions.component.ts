import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-actions',
  imports: [ButtonModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  buttonToken = {
    'rounded.border.radius': '12px',
    'primary.background': '#ffb300',
    'primary.border.color': '#ffb300',
    'primary.hover.color': 'black',
    'primary.hover.background': '#fba221',
    'primary.hover.border.color': '#ffb300',
    'button.gap' : '20px'
  }
}
