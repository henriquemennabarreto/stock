import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProdutoActions from '../../store/produto.actions';
import { ProdutoService } from '../../services/produto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss']
})
export class NovoProdutoComponent {
  produtoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<ProdutoService>,
    private toastController: ToastController
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

  onSubmit(): void {
    if (this.produtoForm.valid) {
      const newProduto = this.produtoForm.value;
      this.store.dispatch(ProdutoActions.createProduto({ produto: newProduto }));
    } else {
      this.presentToast('Por favor, revise os campos');
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
