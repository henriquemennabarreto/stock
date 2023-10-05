import { createAction, props } from '@ngrx/store';
import { ICreateProdutoRequest, ICreateProdutoResponse, IProduto, IUpdateProdutoRequest, IUpdateProdutoResponse } from '../models/produto';

export const loadProdutos = createAction('[Produto] Load Produtos');

export const loadProdutosSuccess = createAction(
    '[Produto] Load Produtos Success',
    props<{ produtos: any[] }>()
);

export const loadProdutosFailure = createAction(
    '[Produto] Load Produtos Failure',
    props<{ error: any }>()
);

export const createProduto = createAction(
    '[Produto] Create Produto',
    props<{ produto: ICreateProdutoRequest }>()
);

export const createProdutoSuccess = createAction(
    '[Produto] Create Produto Success',
    props<{ produto: IProduto }>()
);

export const createProdutoFailure = createAction(
    '[Produto] Create Produto Failure',
    props<{ error: any }>()
);

export const updateProduto = createAction(
    '[Produto] Update Produto',
    props<{ produto: IUpdateProdutoRequest }>()
);

export const updateProdutoSuccess = createAction(
    '[Produto] Update Produto Success'
);

export const updateProdutoFailure = createAction(
    '[Produto] Update Produto Failure',
    props<{ error: any }>()
);

export const deleteProduto = createAction(
    '[Produto] Delete Produto',
    props<{ id: string }>()
);

export const deleteProdutoSuccess = createAction(
    '[Produto] Delete Produto Success',
    props<{ id: string }>()
);

export const deleteProdutoFailure = createAction(
    '[Produto] Delete Produto Failure',
    props<{ error: any }>()
);

export const startLoading = createAction('[Produto] Start Loading');
export const stopLoading = createAction('[Produto] Stop Loading');

export const loadProduto = createAction(
    '[Produto] Load Produto',
    props<{ id: string }>()
);

export const loadProdutoSuccess = createAction(
    '[Produto] Load Produto Success',
    props<{ produto: IProduto }>()
);

export const loadProdutoFailure = createAction(
    '[Produto] Load Produto Failure',
    props<{ error: any }>()
);

export const resetCurrentProduto = createAction('[Produto] Reset Current Produto');
