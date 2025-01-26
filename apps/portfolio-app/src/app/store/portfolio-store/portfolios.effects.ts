import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PortfolioActions from './portfolios.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Portfolio } from '../../portfolios/portfolio.model';

@Injectable()
export class PortfolioEffects {
  private API_URL = 'http://localhost:3000/api/portfolios'; 

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadPortfolios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPortfolios),
      switchMap(() =>
        this.http.get<Portfolio[]>(this.API_URL, { withCredentials: true }).pipe(
          map((portfolios) =>
            PortfolioActions.loadPortfoliosSuccess({ portfolios })
          ),
          catchError((error) => of(PortfolioActions.loadPortfoliosFailure({ error })))
        )
      )
    )
  );

  loadPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPortfolio),
      switchMap(({ id }) =>
        this.http.get<Portfolio>(`${this.API_URL}/${id}`, { withCredentials: true }).pipe(
          map((portfolio) =>
            PortfolioActions.loadPortfolioSuccess({ portfolio })
          ),
          catchError((error) => of(PortfolioActions.loadPortfolioFailure({ error })))
        )
      )
    )
  );

  createPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.createPortfolio),
      switchMap(({ portfolio }) =>
        this.http
          .post<Portfolio>(this.API_URL, portfolio, { withCredentials: true })
          .pipe(
            map((newPortfolio) =>
              PortfolioActions.createPortfolioSuccess({ portfolio: newPortfolio })
            ),
            catchError((error) =>
              of(PortfolioActions.createPortfolioFailure({ error }))
            )
          )
      )
    )
  );

  updatePortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.updatePortfolio),
      switchMap(({ id, changes }) =>
        this.http
          .patch<Portfolio>(`${this.API_URL}/${id}`, changes, { withCredentials: true })
          .pipe(
            map((updatedPortfolio) =>
              PortfolioActions.updatePortfolioSuccess({ portfolio: updatedPortfolio })
            ),
            catchError((error) =>
              of(PortfolioActions.updatePortfolioFailure({ error }))
            )
          )
      )
    )
  );

  deletePortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.deletePortfolio),
      switchMap(({ id }) =>
        this.http
          .delete<{ message?: string }>(`${this.API_URL}/${id}`, {
            withCredentials: true,
          })
          .pipe(
            map(() => PortfolioActions.deletePortfolioSuccess({ id })),
            catchError((error) =>
              of(PortfolioActions.deletePortfolioFailure({ error }))
            )
          )
      )
    )
  );
}
