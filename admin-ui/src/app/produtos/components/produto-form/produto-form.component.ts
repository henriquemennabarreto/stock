import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as ProdutoActions from '../../store/produto.actions';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { IProduto } from '../../models/produto';
import * as ProdutoSelectors from '../../store/produto.selectors';
import * as ProdutoReducer from '../../store/produto.reducer';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements ViewDidEnter, CanDeactivate<ProdutoFormComponent>, ViewDidLeave {

  public produtoForm: FormGroup;
  public currentProduto: IProduto|null = null;
  private subscriptions: Subscription[] = [];
  public submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ produto: ProdutoReducer.ProdutoState }>,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) {
    this.produtoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      insumoId: ['', Validators.required],
      insumoNome: ['', Validators.required],
      quantidadeEstoque: ['', Validators.required],
      dataProducao: ['', Validators.required],
      dataValidade: ['', Validators.required],
      quantidadeLote: ['', Validators.required]
    });
  }

  ionViewDidEnter(): void {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        const produtoId = params['id'];
        if (produtoId) {
          this.loadProduto(produtoId);
        }
      })
    );
    
    this.subscriptions.push(
      this.store.select(ProdutoSelectors.selectCurrentProduto).pipe(
      ).subscribe(produto => {
        this.submitting = false;
        this.currentProduto = produto ?? null;
        console.log('select currentProduto', this.currentProduto)
        if (produto) {
          this.produtoForm.patchValue(produto);
        } else {
          this.produtoForm.reset();
        }
      })
    );
  
    this.subscriptions.push(
      this.store.pipe(select(ProdutoSelectors.selectError)).subscribe(failure => {
        if (failure) {
          this.submitting = false;
          this.presentToast('Ocorreu um erro ao criar o produto.');
        }
      })
    );
  }

  ionViewDidLeave(): void {
    console.log('will reset')
    this.store.dispatch(ProdutoActions.resetCurrentProduto());
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  async canDeactivate(): Promise<boolean> {
    if (this.produtoForm.dirty) {
      const alert = await this.alertController.create({
        header: 'Alterações não salvas',
        message: 'Você tem alterações não salvas. Tem certeza de que deseja sair?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Sair',
            handler: () => {
              return true;
            }
          }
        ]
      });
      await alert.present();
      const { data } = await alert.onDidDismiss();
      return !!data;
    }
    return true;
  }

  loadProduto(id: string) {
    this.store.dispatch(ProdutoActions.loadProduto({ id }));
  }

  onSubmit(): void {
    console.log('is there currentproduto', this.currentProduto)
    if (this.submitting) {
      this.presentToast('Por favor, aguarde');
      return;
    }
    if (!this.produtoForm.valid) {
      this.presentToast('Por favor, revise os campos');
      return;
    }
    this.submitting = true;
    const produtoData = this.produtoForm.value;
    if (this.currentProduto) {
      this.store.dispatch(ProdutoActions.updateProduto({ produto: { ...produtoData, id: this.currentProduto.id } }));
    } else {
      this.store.dispatch(ProdutoActions.createProduto({ produto: produtoData }));
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }  
  
}