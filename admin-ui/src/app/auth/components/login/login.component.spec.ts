import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthEffects } from '../../store/auth.effects';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockStore: jasmine.SpyObj<Store>;
    let mockToastController: jasmine.SpyObj<ToastController>;

    const mockAuthEffects = {
        loginSuccessNotification: jasmine.createSpy('loginSuccessNotification').and.returnValue(of(null)), 
        loginFailureNotification: jasmine.createSpy('loginFailureNotification').and.returnValue(of({error: 'Error'}))
    };

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('Store', ['dispatch']);
        mockToastController = jasmine.createSpyObj('ToastController', ['create']);
        
        mockToastController.create.and.returnValue(Promise.resolve({
            present: jasmine.createSpy('present')
        } as any));  // <-- use casting to 'any' here to bypass type checking.

        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            declarations: [LoginComponent],
            providers: [
                { provide: Store, useValue: mockStore },
                { provide: ToastController, useValue: mockToastController },
                { provide: AuthEffects, useValue: mockAuthEffects },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch login action when form is valid and onSubmit is called', () => {
        component.loginForm.setValue({
            email: 'test@example.com',
            password: 'testPassword'
        });

        component.onSubmit();

        expect(mockStore.dispatch).toHaveBeenCalledWith(
            jasmine.objectContaining({
                type: '[Auth] Login'
            })
        );
    });

    it('should show toast when form is invalid and onSubmit is called', async () => {
        component.loginForm.setValue({
            email: '',
            password: ''
        });

        await component.onSubmit();

        expect(mockToastController.create).toHaveBeenCalled();
    });

    it('should show success toast when login is successful', async () => {
        mockAuthEffects.loginSuccessNotification.and.returnValue(of({
            type: '[Auth] Login Success',
            token: 'mockToken'
        }));
        component.ngOnInit();
        expect(mockToastController.create).toHaveBeenCalled();
    });

    it('should show failure toast when login fails', async () => {
        mockAuthEffects.loginFailureNotification.and.returnValue(of({
            type: '[Auth] Login Failure',
            error: 'Test Error'
        }));
        component.ngOnInit();
        expect(mockToastController.create).toHaveBeenCalled();
    });
});
