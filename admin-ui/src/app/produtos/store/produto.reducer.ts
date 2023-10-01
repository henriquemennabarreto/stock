import { createReducer, on, Action } from '@ngrx/store';
import * as ProdutoActions from './produto.actions';

export interface ProdutoState {
  produtos: any[];
  currentProduto: any | null;
  error: any;
  isLoading: boolean;
}

export const initialState: ProdutoState = {
  produtos: [],
  currentProduto: null,
  error: null,
  isLoading: false
};

const _produtoReducer = createReducer(
  initialState,

  on(ProdutoActions.loadProdutosSuccess, (state, { produtos }) => ({
    ...state,
    produtos,
    isLoading: false
  })),

  on(ProdutoActions.loadProdutosFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),

  on(ProdutoActions.loadProduto, state => ({
    ...state,
    isLoading: true
  })),

  on(ProdutoActions.loadProdutoSuccess, (state, { produto }) => ({
    ...state,
    currentProduto: produto,
    isLoading: false
  })),

  on(ProdutoActions.createProdutoSuccess, (state, { produto }) => ({
    ...state,
    currentProduto: produto
  })),

  on(ProdutoActions.updateProdutoSuccess, (state, { produto }) => ({
    ...state,
    currentProduto: produto
  })),

  on(ProdutoActions.startLoading, state => ({
    ...state,
    isLoading: true
  })),

  on(ProdutoActions.stopLoading, state => ({
    ...state,
    isLoading: false
  })),

  on(ProdutoActions.resetCurrentProduto, state => ({
    ...state,
    currentProduto: null
  })),
);

export function produtoReducer(state: ProdutoState | undefined, action: Action) {
  return _produtoReducer(state, action);
}