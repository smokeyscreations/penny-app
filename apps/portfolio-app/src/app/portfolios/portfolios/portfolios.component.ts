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
import { FormControl, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SpeedDialModule, FileUploadModule, DatePickerModule, FloatLabelModule, CascadeSelectModule, InputGroupModule, InputGroupAddonModule, ButtonModule, CommonModule, MultiSelectModule, ToolbarModule, IconFieldModule, InputIconModule, SplitButtonModule, ProjectComponent]
})
export class PortfoliosComponent implements OnInit {

  form = new FormGroup({
    portTitle: new FormControl(),
    portDesc: new FormControl(''), 
    portStartDate: new FormControl(''),
    portEndDate: new FormControl(''),

    projTitle: new FormControl(''),
    projName: new FormControl(''),
    projDescription: new FormControl(''),
    projImages: new FormControl('')

  });
  readonly items = signal<MenuItem[]>(speedDialItems);

  portfolios$!: Observable<Portfolio[]>;
  selectedPortfolio$!: Observable<Portfolio | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

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
