import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromProduto from 'src/app/produtos/store/produto.reducer';

export interface State {
  produto: fromProduto.ProdutoState;
}

export const reducers: ActionReducerMap<State> = {
  produto: fromProduto.produtoReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
