import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment';
import * as fromProduto from 'src/app/produtos/store/produto.reducer';
import * as fromAuth from 'src/app/auth/store/auth.reducer';

export interface State {
  produto: fromProduto.ProdutoState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  produto: fromProduto.reducer,
  auth: fromAuth.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['produto', 'auth'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? 
  [logger, localStorageSyncReducer] : [localStorageSyncReducer];
