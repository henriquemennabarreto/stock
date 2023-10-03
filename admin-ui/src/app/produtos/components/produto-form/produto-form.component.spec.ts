import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutoFormComponent } from './produto-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IProduto } from '../../models/produto';

describe('ProdutoFormComponent', () => {
    let component: ProdutoFormComponent;
    let fixture: ComponentFixture<ProdutoFormComponent>;
    let store: jasmine.SpyObj<Store>;
    let alertController: jasmine.SpyObj<AlertController>;
    let toastController: jasmine.SpyObj<ToastController>;
    const mockActivatedRoute = { params: of({ id: '123' }) };

    beforeEach(async () => {
        const storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        storeMock.select.and.returnValue(of(null));
        
        const alertMock = {
            present: jasmine.createSpy('present'),
            onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({ data: true }))
        };
        const alertControllerMock = jasmine.createSpyObj('AlertController', ['create']);
        alertControllerMock.create.and.returnValue(Promise.resolve(alertMock));
        
        await TestBed.configureTestingModule({
            declarations: [ProdutoFormComponent],
            imports: [
                IonicModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            providers: [
                FormBuilder,
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Store, useValue: storeMock },
                { provide: AlertController, useValue: alertControllerMock },
                { provide: ToastController, useValue: jasmine.createSpyObj('ToastController', ['create']) }
            ]
        }).compileComponents();
        
        fixture = TestBed.createComponent(ProdutoFormComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store as any);
        alertController = TestBed.inject(AlertController as any);
        toastController = TestBed.inject(ToastController as any);
    });
    
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    
    it('should initialize form group on creation', () => {
        expect(component.produtoForm).toBeDefined();
    });
    
    it('should dispatch updateProduto action when a current product is set', () => {
        component.currentProduto = {
            id: '123',
            nome: 'string',
            tipo: 'string',
            insumoId: 'string',
            insumoNome: 'string',
            quantidadeEstoque: 123,
            dataProducao: 'string',
            dataValidade: 'string',
            quantidadeLote: 123,
        };
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
            type: '[Produto] Update Produto'
        }));
    });
    
    
    it('should dispatch resetCurrentProduto action on ionViewDidLeave', () => {
        component.ionViewDidLeave();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
            type: '[Produto] Reset Current Produto'
        }));
    });
    
    it('should display a toast when form is invalid on submission', async () => {
        const spy = toastController.create.and.returnValue(Promise.resolve({
            present: jasmine.createSpy('present')
        }) as any);               
        component.produtoForm.setErrors({ invalid: true });
        component.onSubmit();
        expect(spy).toHaveBeenCalled();
    });
    
    it('should dispatch createProduto action when no current product is set', () => {
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
            type: '[Produto] Create Produto'
        }));
    });
    
    it('should reset the form when currentProduto is null', () => {
        store.select.and.returnValue(of(null));
        component.ngOnInit();
        expect(component.produtoForm.pristine).toBeTruthy();
    });
    
    it('should patch the form with product values when currentProduto is provided', () => {
        const mockProduct: IProduto = {
            id: '123',
            nome: 'string',
            tipo: 'string',
            insumoId: 'string',
            insumoNome: 'string',
            quantidadeEstoque: 123,
            dataProducao: 'string',
            dataValidade: 'string',
            quantidadeLote: 123,
        };
        store.select.and.returnValue(of(mockProduct)); // Mock returning a product for currentProduto
        component.ngOnInit();
        expect(component.produtoForm.value).toEqual(mockProduct);
    });
    
    it('should dispatch updateProduto action when a current product is set', () => {
        component.currentProduto = {
            id: '123',
            nome: 'string',
            tipo: 'string',
            insumoId: 'string',
            insumoNome: 'string',
            quantidadeEstoque: 123,
            dataProducao: 'string',
            dataValidade: 'string',
            quantidadeLote: 123,
        };
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
            type: '[Produto] Update Produto'
        }));
    });
    
    it('should show alert on canDeactivate when form is dirty', async () => {
        component.produtoForm.markAsDirty();
        const canDeactivate = await component.canDeactivate();
        expect(alertController.create).toHaveBeenCalled();
    });
    
});
