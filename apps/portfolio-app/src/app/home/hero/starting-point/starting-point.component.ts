import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-starting-point',
  imports: [AnimateOnScrollModule],
  templateUrl: './starting-point.component.html',
  styleUrl: './starting-point.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartingPointComponent { }
