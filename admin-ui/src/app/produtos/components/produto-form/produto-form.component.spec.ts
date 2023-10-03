import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutoFormComponent } from './produto-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertController, ToastController } from '@ionic/angular';
import { of } from 'rxjs';

describe('ProdutoFormComponent', () => {
    let component: ProdutoFormComponent;
    let fixture: ComponentFixture<ProdutoFormComponent>;
    let store: jasmine.SpyObj<Store>;
    let alertController: jasmine.SpyObj<AlertController>;
    let toastController: jasmine.SpyObj<ToastController>;
    const mockActivatedRoute = { params: of({ id: '123' }) };
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProdutoFormComponent],
            imports: [ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Store, useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']) },
                { provide: AlertController, useValue: jasmine.createSpyObj('AlertController', ['create']) },
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
    
    it('should dispatch loadProduto action when a product ID is provided in route params', () => {
        component.ngOnInit();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
            type: '[Produto] Load Produto'
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
});
