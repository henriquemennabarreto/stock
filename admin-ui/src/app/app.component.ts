import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from 'src/app/store/reducers';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Produtos', url: '/produtos', icon: 'barcode' },
  ];
  
  authState$: Observable<AuthState>;

  constructor(private store: Store<fromRoot.State>) {
    this.authState$ = this.store.select('auth');
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
