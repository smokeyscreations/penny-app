import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-hero',
  imports: [ImageModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent { }
