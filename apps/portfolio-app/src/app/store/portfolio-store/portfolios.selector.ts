// src/app/store/portfolios.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPortfolios from './portfolio.reducer';

// Feature Selector
export const selectPortfolioFeature = createFeatureSelector<fromPortfolios.State>(
  fromPortfolios.portfolioFeatureKey
);

// Select all portfolios
export const selectAllPortfolios = createSelector(
  selectPortfolioFeature,
  (state: fromPortfolios.State) => state.portfolios
);

// Select selected portfolio
export const selectSelectedPortfolio = createSelector(
  selectPortfolioFeature,
  (state: fromPortfolios.State) => state.selectedPortfolio
);

// Select loading state
export const selectLoading = createSelector(
  selectPortfolioFeature,
  (state: fromPortfolios.State) => state.loading
);

// Select error state
export const selectError = createSelector(
  selectPortfolioFeature,
  (state: fromPortfolios.State) => state.error
);
