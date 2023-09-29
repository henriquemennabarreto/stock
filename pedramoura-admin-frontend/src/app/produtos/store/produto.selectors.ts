import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProdutoState } from './produto.reducer';

export const selectProdutoState = createFeatureSelector<ProdutoState>('produto');

export const selectAllProdutos = createSelector(
  selectProdutoState,
  (state: ProdutoState) => state.produtos
);

export const selectProdutoError = createSelector(
  selectProdutoState,
  (state: ProdutoState) => state.error
);

export const selectLoading = createSelector(
  selectProdutoState,
  (state: ProdutoState) => state.isLoading
);
