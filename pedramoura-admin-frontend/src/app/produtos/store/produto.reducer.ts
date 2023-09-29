import { createReducer, on, Action } from '@ngrx/store';
import * as ProdutoActions from './produto.actions';

export interface ProdutoState {
  produtos: any[];
  error: any;
  isLoading: boolean;
}

export const initialState: ProdutoState = {
  produtos: [],
  error: null,
  isLoading: false
};

const _produtoReducer = createReducer(
  initialState,
  
  on(ProdutoActions.loadProdutosSuccess, (state, { produtos }) => ({
    ...state,
    produtos
  })),
  
  on(ProdutoActions.loadProdutosFailure, (state, { error }) => ({
    ...state,
    error
  })),
  
  on(ProdutoActions.startLoading, state => ({
    ...state,
    isLoading: true
  })),

  on(ProdutoActions.stopLoading, state => ({
    ...state,
    isLoading: false
  })),
);

export function produtoReducer(state: ProdutoState | undefined, action: Action) {
  return _produtoReducer(state, action);
}

export const selectAllProdutos = (state: ProdutoState) => state.produtos;
export const selectProdutoError = (state: ProdutoState) => state.error;
