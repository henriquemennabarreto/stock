import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ListaProdutosComponent } from './lista-produtos.component';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as ProdutoActions from '../../store/produto.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('ListaProdutosComponent', () => {
    let component: ListaProdutosComponent;
    let fixture: ComponentFixture<ListaProdutosComponent>;
    let store: Store;
    let router: Router;
    let alertController: AlertController;
    let loadingController: LoadingController;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                IonicModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            declarations: [ListaProdutosComponent],
            providers: [
                { provide: Store, useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']) },
                { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
                { 
                    provide: AlertController, 
                    useValue: {
                        create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
                            present: jasmine.createSpy('present')
                        }))
                    } 
                },
                { 
                    provide: LoadingController, 
                    useValue: {
                        create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
                            present: jasmine.createSpy('present'),
                            dismiss: jasmine.createSpy('dismiss')
                        }))
                    } 
                  }                  
            ]
        }).compileComponents();
        
        fixture = TestBed.createComponent(ListaProdutosComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
        router = TestBed.inject(Router);
        alertController = TestBed.inject(AlertController);
        loadingController = TestBed.inject(LoadingController);
    });
    
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    
    it('should dispatch loadProdutos action on ionViewDidEnter', () => {
        component.ionViewDidEnter();
        expect(store.dispatch).toHaveBeenCalledWith(ProdutoActions.loadProdutos());
    });
    
    it('should dispatch resetCurrentProduto action on ionViewDidLeave', () => {
        component.ionViewDidLeave();
        expect(store.dispatch).toHaveBeenCalledWith(ProdutoActions.resetCurrentProduto());
    });
    
    it('should navigate to edit product page when onEditProduto is called', () => {
        component.onEditProduto('1234');
        expect(router.navigate).toHaveBeenCalledWith(['/produtos/editar/1234']);
    });
    
    it('should display a confirmation alert when onDeleteProduto is called', async () => {
        await component.onDeleteProduto('1234');
        expect(alertController.create).toHaveBeenCalled();
    });
    
});
