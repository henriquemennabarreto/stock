import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as ProdutoActions from './produto.actions';
import { ProdutoService } from '../services/produto.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProdutoReducer from './produto.reducer';

@Injectable()
export class ProdutoEffects {

  constructor(
    private actions$: Actions,
    private produtoService: ProdutoService,
    private store: Store<ProdutoReducer.ProdutoState>
  ) { }

  loadProdutos$ = createEffect(() => this.actions$.pipe(
    ofType(ProdutoActions.loadProdutos),
    tap(() => this.store.dispatch(ProdutoActions.startLoading())),
    switchMap(() => this.produtoService.getAll().pipe(
      map(produtos => ProdutoActions.loadProdutosSuccess({ produtos })),
      catchError(error => of(ProdutoActions.loadProdutosFailure({ error })))
    )),
    tap(() => this.store.dispatch(ProdutoActions.stopLoading()))
  ));

  loadProduto$ = createEffect(() => this.actions$.pipe(
    ofType(ProdutoActions.loadProduto),
    switchMap(action => this.produtoService.getById(action.id).pipe(
      map(produto => ProdutoActions.loadProdutoSuccess({ produto })),
      catchError(error => of(ProdutoActions.loadProdutoFailure({ error })))
    ))
  ));
  
  createProduto$ = createEffect(() => this.actions$.pipe(
    ofType(ProdutoActions.createProduto),
    switchMap(action => this.produtoService.create(action.produto).pipe(
      tap(() => this.store.dispatch(ProdutoActions.loadProdutos())),
      // map(produto => ProdutoActions.createProdutoSuccess({ produto })),
      map(produto => { console.log('createProdutoSuccess response', produto); return ProdutoActions.createProdutoSuccess({ produto }) }),
      catchError(error => of(ProdutoActions.createProdutoFailure({ error })))
    ))
  ));
  
  updateProduto$ = createEffect(() => this.actions$.pipe(
    ofType(ProdutoActions.updateProduto),
    switchMap(action => this.produtoService.update(action.produto).pipe(
      tap(() => this.store.dispatch(ProdutoActions.loadProdutos())),
      // map(produto => ProdutoActions.updateProdutoSuccess({ produto })),
      map(produto => { console.log('updateProdutoSuccess response', produto); return ProdutoActions.updateProdutoSuccess({ produto }) }),
      catchError(error => of(ProdutoActions.updateProdutoFailure({ error })))
    ))
  ));  
  
  deleteProduto$ = createEffect(() => this.actions$.pipe(
    ofType(ProdutoActions.deleteProduto),
    mergeMap((action) => this.produtoService.delete(action.id)
      .pipe(
        map(() => {
          this.store.dispatch(ProdutoActions.loadProdutos());
          return ProdutoActions.deleteProdutoSuccess({ id: action.id });
        }),
        catchError(error => of(ProdutoActions.deleteProdutoFailure({ error })))
      ))
  ));


}
