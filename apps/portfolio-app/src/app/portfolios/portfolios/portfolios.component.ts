// src/app/portfolios/portfolios.component.ts

import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Portfolio } from '../portfolio.model';
import * as PortfolioActions from '../../store/portfolio-store/portfolios.action';
import { 
  selectAllPortfolios, 
  selectSelectedPortfolio, 
  selectLoading, 
  selectError 
} from '../../store/portfolio-store/portfolios.selector';
import { AsyncPipe } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';
import { speedDialItems } from '../../shared/button/items.model';
import { FileUploadModule } from 'primeng/fileupload';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, SpeedDialModule, FileUploadModule, DatePickerModule, FloatLabelModule, CascadeSelectModule]
})
export class PortfoliosComponent implements OnInit {

  readonly items = signal<MenuItem[]>(speedDialItems);

  portfolios$!: Observable<Portfolio[]>;
  selectedPortfolio$!: Observable<Portfolio | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PortfolioActions.loadPortfolios());
    this.portfolios$ = this.store.pipe(select(selectAllPortfolios));
    this.selectedPortfolio$ = this.store.pipe(select(selectSelectedPortfolio));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));
  }
  selectPortfolio(id: string): void {
    this.store.dispatch(PortfolioActions.loadPortfolio({ id }));
  }

}
