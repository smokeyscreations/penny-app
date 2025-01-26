import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { StartingPointComponent } from './starting-point/starting-point.component';

@Component({
  selector: 'app-hero',
  imports: [ImageModule, ButtonModule, StartingPointComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent { 
  getStartedToken = {
    'border.radius': '32px',
    'primary.background': '#ffb300',
    'primary.color': 'black',
    'primary.border.color': '#ffb300',
    'primary.hover.color': 'black',
    'primary.hover.background': '#fba221',
    'primary.hover.border.color': '#ffb300'
  }
}
