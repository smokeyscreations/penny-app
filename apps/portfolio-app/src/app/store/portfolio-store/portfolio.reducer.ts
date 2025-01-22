import { createReducer, on } from '@ngrx/store';
import * as PortfolioActions from './portfolios.action';
import { Portfolio } from '../../portfolios/portfolio.model';

export const portfolioFeatureKey = 'portfolio';

export interface State {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  portfolios: [],
  selectedPortfolio: null,
  loading: false,
  error: null,
};

export const portfolioReducer = createReducer(
  initialState,

  // Handle loading all portfolios
  on(PortfolioActions.loadPortfolios, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.loadPortfoliosSuccess, (state, action) => ({
    ...state,
    portfolios: action.portfolios,
    loading: false,
  })),
  on(PortfolioActions.loadPortfoliosFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  // Handle loading a single portfolio
  on(PortfolioActions.loadPortfolio, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.loadPortfolioSuccess, (state, action) => ({
    ...state,
    selectedPortfolio: action.portfolio,
    loading: false,
  })),
  on(PortfolioActions.loadPortfolioFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
