// src/app/portfolios.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portfolio } from './portfolio.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfoliosService {

  private readonly apiUrl = 'http://localhost:3000/api/portfolios';

  constructor(private httpClient: HttpClient) {}

  getPortfolios(): Observable<Portfolio[]> {
    return this.httpClient.get<{ portfolios: Portfolio[] }>(this.apiUrl).pipe(
      map(response => response.portfolios)
    );
  }
  getPortfolio(portfolioId: string): Observable<Portfolio> {
    const url = `${this.apiUrl}/${portfolioId}`;
    return this.httpClient.get<Portfolio>(url);
  }
  editPortfolio(model: Portfolio): Observable<Portfolio> {
    const url = `${this.apiUrl}/${model._id}`;
    return this.httpClient.put<Portfolio>(url, model);
  }
  
  deletePortfolio(portfolioId: string): Observable<any> {
    const url = `${this.apiUrl}/${portfolioId}`;
    return this.httpClient.delete(url);
  }
}
