import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { RegisterComponent } from './register.component';
import { IonicModule, ToastController, AlertController, NavController } from '@ionic/angular';
import { AuthEffects } from '../../store/auth.effects';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockToastController: jasmine.SpyObj<ToastController>;
  let mockAlertController: jasmine.SpyObj<AlertController>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockNavController: jasmine.SpyObj<NavController>;

  const mockAuthEffects = {
    createUserSuccessNotification: jasmine.createSpy('createUserSuccessNotification').and.returnValue(of(null)),
    createUserFailureNotification: jasmine.createSpy('createUserFailureNotification').and.returnValue(of(null))
  };

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    mockToastController = jasmine.createSpyObj('ToastController', ['create']);
    mockAlertController = jasmine.createSpyObj('AlertController', ['create']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockNavController = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack']);  // Add more methods if needed

    mockToastController.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present')
    } as any));

    mockAlertController.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present')
    } as any));

    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [RegisterComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ToastController, useValue: mockToastController },
        { provide: AlertController, useValue: mockAlertController },
        { provide: AuthEffects, useValue: mockAuthEffects },
        { provide: Router, useValue: mockRouter },
        { provide: NavController, useValue: mockNavController }
      ]      
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch createUser action when form is valid and onSubmit is called', () => {
    component.registerForm.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'testPassword',
      confirmPassword: 'testPassword'
    });

    component.onSubmit();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[User] Create User'
      })
    );
  });

  it('should show toast when form is invalid and onSubmit is called', async () => {
    component.registerForm.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    await component.onSubmit();

    expect(mockToastController.create).toHaveBeenCalled();
  });

  it('should show success toast and navigate to login when registration is successful', () => {
    mockAuthEffects.createUserSuccessNotification.and.returnValue(of({
      type: '[Auth] Create User Success'
    }));
    
    component.registerForm.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'testPassword',
      confirmPassword: 'testPassword'
    });
    
    component.onSubmit();
    expect(mockToastController.create).toHaveBeenCalled();
    expect(mockAlertController.create).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should show failure toast when registration fails', () => {
    mockAuthEffects.createUserFailureNotification.and.returnValue(of({
      type: '[Auth] Create User Failure'
    }));
    
    component.registerForm.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'testPassword',
      confirmPassword: 'testPassword'
    });
    
    component.onSubmit();
    expect(mockToastController.create).toHaveBeenCalled();
  });
});
