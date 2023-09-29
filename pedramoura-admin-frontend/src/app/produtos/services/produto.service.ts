import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return of([
      {
        id: '00000000-0000-0000',
        nome: 'Nome',
        tipo: 'Tipo'
      },
      {
        id: '00000000-0000-0000',
        nome: 'Nome',
        tipo: 'Tipo'
      },
      {
        id: '00000000-0000-0000',
        nome: 'Nome',
        tipo: 'Tipo'
      },
      {
        id: '00000000-0000-0000',
        nome: 'Nome',
        tipo: 'Tipo'
      },
      {
        id: '00000000-0000-0000',
        nome: 'Nome',
        tipo: 'Tipo'
      },
      {
        id: '00000000-0000-0000',
        nome: 'Nome',
        tipo: 'Tipo'
      }
    ]).pipe(
      delay(500)
    );
    return this.http.get<any[]>(`${this.apiUrl}/produtos`);
  }
  
  create(produto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/produtos`, produto);
  }
  
  // ... Add other methods like updateProduto and deleteProduto.
}
