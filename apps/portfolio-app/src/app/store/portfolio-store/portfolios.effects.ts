// src/app/store/portfolio-store/portfolios.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PortfolioActions from './portfolios.action';
import { PortfoliosService } from '../../portfolios/portfolios.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PortfoliosEffects {

  constructor(
    private actions$: Actions,
    private portfoliosService: PortfoliosService
  ) {}

  loadPortfolios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPortfolios),
      mergeMap(() =>
        this.portfoliosService.getPortfolios().pipe(
          map(portfolios => PortfolioActions.loadPortfoliosSuccess({ portfolios })),
          catchError(error => of(PortfolioActions.loadPortfoliosFailure({ error })))
        )
      )
    )
  );

  loadPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPortfolio),
      mergeMap(action =>
        this.portfoliosService.getPortfolio(action.id).pipe(
          map(portfolio => PortfolioActions.loadPortfolioSuccess({ portfolio })),
          catchError(error => of(PortfolioActions.loadPortfolioFailure({ error })))
        )
      )
    )
  );

}
