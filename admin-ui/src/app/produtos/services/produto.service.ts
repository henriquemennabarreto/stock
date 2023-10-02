import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateProdutoRequest, IProduto, IUpdateProdutoRequest } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<IProduto[]> {
    return this.http.get<IProduto[]>(`${environment.apiUrl}/stock`);
  }
  
  getById(produtoId: string): Observable<IProduto> {
    return this.http.get<IProduto>(`${environment.apiUrl}/stock/${produtoId}`);
  }
  
  create(produto: ICreateProdutoRequest): Observable<IProduto> {
    return this.http.post<IProduto>(`${environment.apiUrl}/stock`, produto);
  }
  
  update(produto: IUpdateProdutoRequest): Observable<IProduto> {
    return this.http.put<IProduto>(`${environment.apiUrl}/stock/${produto.id}`, produto);
  }
  
  delete(produtoId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/stock/${produtoId}`);
  }
}
