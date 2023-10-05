import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateProdutoRequest, ICreateProdutoResponse, IProduto, IUpdateProdutoRequest, IUpdateProdutoResponse } from '../models/produto';

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
  
  create(produto: ICreateProdutoRequest): Observable<ICreateProdutoResponse> {
    return this.http.post<ICreateProdutoResponse>(`${environment.apiUrl}/stock`, produto);
  }
  
  update(produto: IUpdateProdutoRequest): Observable<IUpdateProdutoResponse> {
    return this.http.put<IUpdateProdutoResponse>(`${environment.apiUrl}/stock/${produto.id}`, produto);
  }
  
  delete(produtoId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/stock/${produtoId}`);
  }
}
