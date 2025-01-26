// src/app/portfolios/portfolios.component.ts

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Portfolio } from '../portfolio.model';
import * as PortfolioActions from '../../store/portfolio-store/portfolios.action';
import { 
  selectAllPortfolios, 
  selectSelectedPortfolio, 
  selectPortfolioLoading,
  selectPortfolioError
} from '../../store/portfolio-store/portfolios.selector';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';
import { speedDialItems } from '../../shared/button/items.model';
import { FileUploadModule } from 'primeng/fileupload';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProjectComponent } from "../../projects/project/project.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SpeedDialModule, FileUploadModule, 
    DatePickerModule, FloatLabelModule, CascadeSelectModule, InputGroupModule, InputGroupAddonModule, ButtonModule, 
    CommonModule, MultiSelectModule, ToolbarModule, IconFieldModule, InputIconModule, SplitButtonModule, ProjectComponent, InputTextModule]
})
export class PortfoliosComponent implements OnInit {

  private router = inject(Router);
  portfolios$!: Observable<Portfolio[]>;
  selectedPortfolio$!: Observable<Portfolio | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required]
    }),
    portfolioSummary: new FormControl('', {
      validators: Validators.required
    }),
    dateRange: new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null),
    }),
  });
 
  constructor(private store: Store) {}
  readonly items = signal<MenuItem[]>(speedDialItems);



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

  cancelDesignToken = {
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

  splitIems = [];

  uploadedFiles = [];


  onSubmit(): void {
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }

    const formValue = this.form.value;
    const newPortfolio = {
      title: formValue.title,
      portfolioSummary: formValue.portfolioSummary,
      dateRange: {
        start: formValue.dateRange?.start,
        end: formValue.dateRange?.end,
      },
    };

    this.store.dispatch(PortfolioActions.createPortfolio({ portfolio: newPortfolio }));

    this.router.navigateByUrl('/my-portfolios');
    this.form.reset();
    
  }
  ngOnInit(): void {
    this.store.dispatch(PortfolioActions.loadPortfolios());

    this.portfolios$ = this.store.select(selectAllPortfolios);
    this.selectedPortfolio$ = this.store.select(selectSelectedPortfolio);
    this.loading$ = this.store.select(selectPortfolioLoading);
    this.error$ = this.store.select(selectPortfolioError);
  }
  selectPortfolio(id: string): void {
    this.store.dispatch(PortfolioActions.loadPortfolio({ id }));
  }



}
