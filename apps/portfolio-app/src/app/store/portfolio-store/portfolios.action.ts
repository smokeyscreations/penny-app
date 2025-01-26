import { createAction, props } from '@ngrx/store';
import { Portfolio } from '../../portfolios/portfolio.model';

export const loadPortfolios = createAction('[Portfolio] Load Portfolios');
export const loadPortfoliosSuccess = createAction(
  '[Portfolio] Load Portfolios Success',
  props<{ portfolios: Portfolio[] }>()
);
export const loadPortfoliosFailure = createAction(
  '[Portfolio] Load Portfolios Failure',
  props<{ error: any }>()
);

export const loadPortfolio = createAction(
  '[Portfolio] Load Portfolio',
  props<{ id: string }>()
);
export const loadPortfolioSuccess = createAction(
  '[Portfolio] Load Portfolio Success',
  props<{ portfolio: Portfolio }>()
);
export const loadPortfolioFailure = createAction(
  '[Portfolio] Load Portfolio Failure',
  props<{ error: any }>()
);

export const createPortfolio = createAction(
  '[Portfolio] Create Portfolio',
  props<{ portfolio: Partial<Portfolio> }>()
);
export const createPortfolioSuccess = createAction(
  '[Portfolio] Create Portfolio Success',
  props<{ portfolio: Portfolio }>()
);
export const createPortfolioFailure = createAction(
  '[Portfolio] Create Portfolio Failure',
  props<{ error: any }>()
);

export const updatePortfolio = createAction(
  '[Portfolio] Update Portfolio',
  props<{ id: string; changes: Partial<Portfolio> }>()
);
export const updatePortfolioSuccess = createAction(
  '[Portfolio] Update Portfolio Success',
  props<{ portfolio: Portfolio }>()
);
export const updatePortfolioFailure = createAction(
  '[Portfolio] Update Portfolio Failure',
  props<{ error: any }>()
);

export const deletePortfolio = createAction(
  '[Portfolio] Delete Portfolio',
  props<{ id: string }>()
);
export const deletePortfolioSuccess = createAction(
  '[Portfolio] Delete Portfolio Success',
  props<{ id: string }>()
);
export const deletePortfolioFailure = createAction(
  '[Portfolio] Delete Portfolio Failure',
  props<{ error: any }>()
);
