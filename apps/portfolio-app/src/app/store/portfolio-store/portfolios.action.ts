// src/app/store/portfolios.actions.ts

import { createAction, props } from '@ngrx/store';
import { Portfolio } from '../../portfolios/portfolio.model';

// Action to load all portfolios
export const loadPortfolios = createAction(
  '[Portfolio] Load Portfolios'
);

// Action dispatched on successful load
export const loadPortfoliosSuccess = createAction(
  '[Portfolio] Load Portfolios Success',
  props<{ portfolios: Portfolio[] }>()
);

// Action dispatched on load failure
export const loadPortfoliosFailure = createAction(
  '[Portfolio] Load Portfolios Failure',
  props<{ error: any }>()
);

// Action to load a single portfolio by ID
export const loadPortfolio = createAction(
  '[Portfolio] Load Portfolio',
  props<{ id: string }>()
);

// Action dispatched on successful load of a single portfolio
export const loadPortfolioSuccess = createAction(
  '[Portfolio] Load Portfolio Success',
  props<{ portfolio: Portfolio }>()
);

// Action dispatched on load failure of a single portfolio
export const loadPortfolioFailure = createAction(
  '[Portfolio] Load Portfolio Failure',
  props<{ error: any }>()
);
