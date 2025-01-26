import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { selectAllPortfolios, selectPortfolioLoading, selectPortfolioError } from '../../store/portfolio-store/portfolios.selector';
import * as PortfolioActions from '../../store/portfolio-store/portfolios.action';
import { Observable } from 'rxjs';
import { Portfolio } from '../../portfolios/portfolio.model';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe, NgClass, NgFor} from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { selectCurrentUser } from '../../store/user-store/user.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-portfolios',
  imports: [AsyncPipe, CardModule, ButtonModule, DataViewModule, TagModule, ToolbarModule, IconFieldModule, InputIconModule, SplitButtonModule, InputTextModule, DatePipe],
  templateUrl: './my-portfolios.component.html',
  styleUrl: './my-portfolios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPortfoliosComponent implements OnInit {
  portfolios$!: Observable<Portfolio[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  private router = inject(Router);

  userName = signal<string | undefined>('');

  portfolios = signal<Portfolio[]>([]);

  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(PortfolioActions.loadPortfolios());

    this.portfolios$ = this.store.select(selectAllPortfolios);

    this.store.select(selectCurrentUser).subscribe(user => {
        this.userName.set(user?.name);
      });

    this.loading$ = this.store.select(selectPortfolioLoading);
    this.error$ = this.store.select(selectPortfolioError);
  }

  onDelete(portfolioId: string){
    this.store.dispatch(PortfolioActions.deletePortfolio({ id: portfolioId }));
  }

  navigateToPortfolios(){
    this.router.navigateByUrl('/create-portfolios');
    console.log('click');
  }

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

 }
