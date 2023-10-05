import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { AuthState } from '../../store/auth.reducer';
import { Subscription } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthEffects } from '../../store/auth.effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  public registerForm: FormGroup;
  private subscriptions: Subscription[] = [];
  public submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private toastController: ToastController,
    private alertController: AlertController,
    private authEffects: AuthEffects,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator,
    });
  }

  onSubmit(): void {
    if (this.submitting) {
      this.presentToast('Por favor, aguarde');
      return;
    }
    if (!this.registerForm.valid) {
      this.presentToast('Por favor, revise os campos');
      return;
    }

    this.submitting = true;
    let userData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.store.dispatch(AuthActions.createUser({ user: userData }));
    
    this.subscriptions.push(
        this.authEffects.createUserSuccessNotification().subscribe(() => {
        this.submitting = false;
        this.presentToast('Registro realizado com sucesso');
        this.presentAlert('Registro bem-sucedido', 'Seu registro foi concluído com sucesso. Você pode fazer login agora.');
        this.router.navigate(['/auth/login']);
      })
    );

    this.subscriptions.push(
      this.authEffects.createUserFailureNotification().subscribe(() => {
        this.submitting = false;
        this.presentToast('Ocorreu um erro ao criar a conta.');
      })
    );
  }

  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.controls['password'].value;
    const confirmPassword = formGroup.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      formGroup.controls['confirmPassword'].setErrors({ passwordMismatch: true });
    } else {
      formGroup.controls['confirmPassword'].setErrors(null);
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

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Entendi'],
    });
    alert.present();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
