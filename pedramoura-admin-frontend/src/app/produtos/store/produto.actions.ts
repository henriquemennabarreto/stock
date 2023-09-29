import { createAction, props } from '@ngrx/store';

// Produto actions
export const loadProdutos = createAction('[Produto] Load Produtos');
export const loadProdutosSuccess = createAction('[Produto] Load Produtos Success', props<{ produtos: any[] }>());
export const loadProdutosFailure = createAction('[Produto] Load Produtos Failure', props<{ error: any }>());

export const createProduto = createAction('[Produto] Create Produto', props<{ produto: any }>());
export const createProdutoSuccess = createAction('[Produto] Create Produto Success', props<{ produto: any }>());
export const createProdutoFailure = createAction('[Produto] Create Produto Failure', props<{ error: any }>());

export const updateProduto = createAction('[Produto] Update Produto', props<{ produto: any }>());
export const updateProdutoSuccess = createAction('[Produto] Update Produto Success', props<{ produto: any }>());
export const updateProdutoFailure = createAction('[Produto] Update Produto Failure', props<{ error: any }>());

export const deleteProduto = createAction('[Produto] Delete Produto', props<{ produtoId: number }>);
export const deleteProdutoSuccess = createAction('[Produto] Delete Produto Success', props<{ produtoId: number }>());
export const deleteProdutoFailure = createAction('[Produto] Delete Produto Failure', props<{ error: any }>());

export const startLoading = createAction('[Produto] Start Loading');
export const stopLoading = createAction('[Produto] Stop Loading');
