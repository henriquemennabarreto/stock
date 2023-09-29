import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProdutoService } from './services/produto.service';
import { EffectsModule } from '@ngrx/effects';
import { ProdutoEffects } from './store/produto.effects';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NovoProdutoComponent } from './components/novo-produto/novo-produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListaProdutosComponent,
    NovoProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    EffectsModule.forFeature([ProdutoEffects]),
    IonicModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProdutoService
  ]
})
export class ProdutosModule { }
