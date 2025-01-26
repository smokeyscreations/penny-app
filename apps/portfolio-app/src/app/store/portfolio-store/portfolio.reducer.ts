import { createReducer, on } from '@ngrx/store';
import * as PortfolioActions from './portfolios.action';
import { Portfolio } from '../../portfolios/portfolio.model';

export interface PortfolioState {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
  loading: boolean;
  error: any | null;
}

export const initialState: PortfolioState = {
  portfolios: [],
  selectedPortfolio: null,
  loading: false,
  error: null,
};

export const portfolioReducer = createReducer(
  initialState,

  // LOAD ALL
  on(PortfolioActions.loadPortfolios, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.loadPortfoliosSuccess, (state, { portfolios }) => ({
    ...state,
    loading: false,
    portfolios,
    error: null,
  })),
  on(PortfolioActions.loadPortfoliosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // LOAD SINGLE
  on(PortfolioActions.loadPortfolio, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.loadPortfolioSuccess, (state, { portfolio }) => ({
    ...state,
    loading: false,
    selectedPortfolio: portfolio,
    error: null,
  })),
  on(PortfolioActions.loadPortfolioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // CREATE
  on(PortfolioActions.createPortfolio, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.createPortfolioSuccess, (state, { portfolio }) => ({
    ...state,
    loading: false,
    // Add the new portfolio to the array
    portfolios: [...state.portfolios, portfolio],
    error: null,
  })),
  on(PortfolioActions.createPortfolioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // UPDATE
  on(PortfolioActions.updatePortfolio, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.updatePortfolioSuccess, (state, { portfolio }) => {
    const updatedPortfolios = state.portfolios.map((p) =>
      p._id === portfolio._id ? portfolio : p
    );
    return {
      ...state,
      loading: false,
      portfolios: updatedPortfolios,
      selectedPortfolio:
        state.selectedPortfolio && state.selectedPortfolio._id === portfolio._id
          ? portfolio
          : state.selectedPortfolio,
      error: null,
    };
  }),
  on(PortfolioActions.updatePortfolioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // DELETE
  on(PortfolioActions.deletePortfolio, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.deletePortfolioSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    portfolios: state.portfolios.filter((p) => p._id !== id),
    // If the currently selected portfolio is the one we deleted, clear it
    selectedPortfolio:
      state.selectedPortfolio && state.selectedPortfolio._id === id
        ? null
        : state.selectedPortfolio,
    error: null,
  })),
  on(PortfolioActions.deletePortfolioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
