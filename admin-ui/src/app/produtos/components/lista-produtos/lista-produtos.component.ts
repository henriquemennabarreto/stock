import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProdutoReducer from '../../store/produto.reducer';
import * as ProdutoActions from '../../store/produto.actions';
import * as ProdutoSelectors from '../../store/produto.selectors'; 
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduto } from '../../models/produto';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['lista-produtos.component.scss']
})
export class ListaProdutosComponent implements AfterViewInit, OnDestroy, ViewDidEnter {

  public produtos$: Observable<IProduto[]>;
  public isLoading$: Observable<boolean>;
  public loadingElement: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<ProdutoReducer.ProdutoState>,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router) {
    this.produtos$ = this.store.select(ProdutoSelectors.selectAllProdutos);
    this.isLoading$ = this.store.select(ProdutoSelectors.selectLoading);
    
    this.loadingController.create({
      message: 'Carregando...',
    }).then(loadingElement => {
      this.loadingElement = loadingElement;
    });
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.isLoading$.subscribe(async isLoading => {
        if(!this.loadingElement) {
          return;
        }
        if (isLoading) {
          await this.loadingElement.present();
        } else {
          await this.loadingElement.dismiss();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  ionViewDidEnter(): void {
    this.onRefresh();
  }

  onRefresh(): void {
    this.store.dispatch(ProdutoActions.loadProdutos());
  }

  async confirmDelete(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja realmente excluir este produto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Excluir',
          handler: () => {
            this.store.dispatch(ProdutoActions.deleteProduto({ id }));
          }
        }
      ]
    });

    await alert.present();
  }

  onEditProduto(id: string): void {
    this.router.navigate([`/produtos/editar/${id}`]);
  }

  onDeleteProduto(id: string): void {
    this.confirmDelete(id);
  }

}
