import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio.reducer';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectAllPortfolios = createSelector(
  selectPortfolioState,
  (state) => state.portfolios
);

export const selectSelectedPortfolio = createSelector(
  selectPortfolioState,
  (state) => state.selectedPortfolio
);

export const selectPortfolioLoading = createSelector(
  selectPortfolioState,
  (state) => state.loading
);

export const selectPortfolioError = createSelector(
  selectPortfolioState,
  (state) => state.error
);
