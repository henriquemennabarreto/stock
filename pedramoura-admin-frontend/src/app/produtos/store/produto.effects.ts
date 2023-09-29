import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as ProdutoActions from './produto.actions';
import { ProdutoService } from '../services/produto.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProdutoReducer from './produto.reducer';

@Injectable()
export class ProdutoEffects {


  constructor(private actions$: Actions,
    private produtoService: ProdutoService,
    private store: Store<ProdutoReducer.ProdutoState>) { }
    
  loadProdutos$ = createEffect(() => this.actions$.pipe(
    ofType(ProdutoActions.loadProdutos),
    switchMap(() => {
      this.store.dispatch(ProdutoActions.startLoading());
      return this.produtoService.getAll().pipe(
        map(produtos => {
          this.store.dispatch(ProdutoActions.stopLoading());
          return ProdutoActions.loadProdutosSuccess({ produtos });
        }),
        catchError(error => {
          this.store.dispatch(ProdutoActions.stopLoading());
          return of(ProdutoActions.loadProdutosFailure({ error }));
        })
      );
    })
  ));

  createProduto$ = createEffect(() => this.actions$.pipe(
    ofType(ProdutoActions.createProduto),
    mergeMap((action) => this.produtoService.create(action.produto)
      .pipe(
        map(produto => ProdutoActions.createProdutoSuccess({ produto })),
        catchError(error => of(ProdutoActions.createProdutoFailure({ error })))
      ))
  ));

}
