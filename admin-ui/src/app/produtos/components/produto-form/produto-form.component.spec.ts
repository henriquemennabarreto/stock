import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProdutoFormComponent } from './produto-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

describe('ProdutoFormComponent', () => {
    let component: ProdutoFormComponent;
    let fixture: ComponentFixture<ProdutoFormComponent>;
    
    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(of(null)),
        dispatch: jasmine.createSpy('dispatch'),
        pipe: jasmine.createSpy('pipe').and.returnValue(of(null))
    };
    
    const mockToastController = {
        create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
            present: jasmine.createSpy('present').and.returnValue(Promise.resolve())
        }))
    };
    
    const mockAlertController = {
        create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
            present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
            onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({data: true}))
        }))
    };
    
    const mockActivatedRoute = {
        params: of({id: 'testId'})
    };
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProdutoFormComponent],
            imports: [
                IonicModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
                ReactiveFormsModule
            ],
            providers: [
                FormBuilder,
                { provide: Store, useValue: mockStore },
                { provide: ToastController, useValue: mockToastController },
                { provide: AlertController, useValue: mockAlertController },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: NgxMaskDirective, useValue: NgxMaskDirective },
                { provide: NgxMaskPipe, useValue: NgxMaskPipe },
            ]
        }).compileComponents();
    });
    
    beforeEach(() => {
        mockStore.select.calls.reset();
        mockStore.dispatch.calls.reset();
        mockStore.pipe.calls.reset();
        mockToastController.create.calls.reset();
        mockAlertController.create.calls.reset();
        
        fixture = TestBed.createComponent(ProdutoFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    afterEach(() => {
        mockStore.select.calls.reset();
        mockStore.dispatch.calls.reset();
        mockStore.pipe.calls.reset();
        mockToastController.create.calls.reset();
        mockAlertController.create.calls.reset();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should dispatch loadProduto when there is a productId in route params', () => {
        expect(mockStore.dispatch).toHaveBeenCalledWith({
            type: '[Produto] Load Produto',
            id: 'testId'
        });
    });
    
    it('should show a toast message when the form is not valid', async () => {
        component.produtoForm.controls['name'].setValue('');
        component.onSubmit();
        expect(mockToastController.create).toHaveBeenCalledWith({
            message: 'Por favor, revise os campos',
            duration: 2000,
            position: 'top',
            color: 'danger'
        });
    });
    
});

