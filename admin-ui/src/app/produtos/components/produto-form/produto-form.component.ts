import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as ProdutoActions from '../../store/produto.actions';
import { AlertController, ToastController, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { IProduto } from '../../models/produto';
import * as ProdutoSelectors from '../../store/produto.selectors';
import * as ProdutoReducer from '../../store/produto.reducer';
import { ProdutoEffects } from '../../store/produto.effects';


@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit, OnDestroy, CanDeactivate<ProdutoFormComponent>, ViewDidLeave {

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
    private produtoEffects: ProdutoEffects
  ) {
    this.produtoForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(ProdutoSelectors.selectCurrentProduto).subscribe(produto => {
        this.submitting = false;
        this.currentProduto = produto || null;
        if (produto) {
          this.produtoForm.patchValue(produto);
        } else {
          this.produtoForm.reset();
        }
      })
    );
  
    this.subscriptions.push(
      this.store.select(ProdutoSelectors.selectError).subscribe(error => {
        if (error) {
          this.submitting = false;
          this.presentToast('Ocorreu um erro ao criar o produto.');
        }
      })
    );
  
    this.subscriptions.push(
      this.produtoEffects.createProdutoSuccessNotification().subscribe(() => {
        this.submitting = false;
        this.presentToast('Produto cadastrado.');
      })
    );

    this.subscriptions.push(
      this.produtoEffects.createProdutoFailureNotification().subscribe(() => {
        this.submitting = false;
        this.presentToast('Ocorreu um erro ao cadastrar produto.');
      })
    );
    
    this.subscriptions.push(
      this.produtoEffects.updateProdutoSuccessNotification().subscribe(() => {
        this.submitting = false;
        this.presentToast('Produto atualizado.');
      })
    );

    this.subscriptions.push(
      this.produtoEffects.updateProdutoFailureNotification().subscribe(() => {
        this.submitting = false;
        this.presentToast('Ocorreu um erro ao editar produto.');
      })
    );

    this.subscriptions.push(
      this.route.params.subscribe(params => {
        const produtoId = params['id'];
        if (produtoId) {
          this.loadProduto(produtoId);
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

  ionViewDidLeave(): void {
    this.store.dispatch(ProdutoActions.resetCurrentProduto());
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
    });
    toast.present();
  }  
  
}
