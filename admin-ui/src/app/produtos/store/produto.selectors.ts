import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProdutoReducer from './produto.reducer';

export const selectProdutoState = createFeatureSelector<ProdutoReducer.ProdutoState>('produto');

export const selectAllProdutos = createSelector(
  selectProdutoState,
  (state: ProdutoReducer.ProdutoState) => state.produtos
);

export const selectCurrentProduto = createSelector(
  selectProdutoState,
  (state: ProdutoReducer.ProdutoState) => state.currentProduto
);

export const selectLoading = createSelector(
  selectProdutoState,
  (state: ProdutoReducer.ProdutoState) => state.isLoading
);

export const selectError = createSelector(
  selectProdutoState,
  (state: ProdutoReducer.ProdutoState) => state.error
);
