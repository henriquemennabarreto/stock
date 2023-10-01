import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  private mockProdutos: IProduto[] = [
    { 
      id: '00000000-0000-0000-0000-000000000000', 
      nome: 'Produto A', 
      tipo: 'Tipo A',
      insumoId: 'ins-0000',
      insumoNome: 'Insumo A',
      quantidadeEstoque: 100,
      dataProducao: new Date().toISOString(),
      dataValidade: new Date().toISOString(),
      quantidadeLote: 50
    },
    { 
      id: '00000000-0000-0000-0000-000000000001', 
      nome: 'Produto B', 
      tipo: 'Tipo B',
      insumoId: 'ins-0001',
      insumoNome: 'Insumo B',
      quantidadeEstoque: 200,
      dataProducao: new Date().toISOString(),
      dataValidade: new Date().toISOString(),
      quantidadeLote: 60
    },
    { 
      id: '00000000-0000-0000-0000-000000000002', 
      nome: 'Produto C', 
      tipo: 'Tipo C',
      insumoId: 'ins-0002',
      insumoNome: 'Insumo C',
      quantidadeEstoque: 250,
      dataProducao: new Date().toISOString(),
      dataValidade: new Date().toISOString(),
      quantidadeLote: 55
    },
  ];
  
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<any[]> {
    return of([...this.mockProdutos]).pipe(delay(500));
    // return this.http.get<any[]>(`${environment.apiUrl}/produtos`);
  }
  
  getById(produtoId: string): Observable<any> {
    const produto = this.mockProdutos.find(p => p.id === produtoId);
    return of(produto).pipe(delay(500));
    // return this.http.get<any>(`${environment.apiUrl}/produtos/${produtoId}`);
  }
  
  create(produto: any): Observable<any> {
    const newProduto = {
      ...produto,
      id: `00000000-0000-00${this.mockProdutos.length}`
    }
    this.mockProdutos.push(newProduto);
    return of(newProduto).pipe(delay(500));
    // return this.http.post<any>(`${environment.apiUrl}/produtos`, produto);
  }
  
  update(produto: any): Observable<any> {
    const index = this.mockProdutos.findIndex(p => p.id === produto.id);
    if (index > -1) {
      this.mockProdutos[index] = produto;
    }
    return of(produto).pipe(delay(500));
    // return this.http.put<any>(`${environment.apiUrl}/produtos/${produto.id}`, produto);
  }
  
  delete(produtoId: string): Observable<void> {
    const index = this.mockProdutos.findIndex(p => p.id === produtoId);
    if (index > -1) {
      this.mockProdutos.splice(index, 1);
    }
    return of(undefined).pipe(delay(500));
    // return this.http.delete<void>(`${environment.apiUrl}/produtos/${produtoId}`);
  }
}
