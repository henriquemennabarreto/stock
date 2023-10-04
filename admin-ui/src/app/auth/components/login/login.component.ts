import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { AuthState } from '../../store/auth.reducer';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AuthEffects } from '../../store/auth.effects';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  public submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private toastController: ToastController,
    private authEffects: AuthEffects
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {    
    this.subscriptions.push(
      this.authEffects.loginSuccessNotification().subscribe(() => {
        this.submitting = false;
        this.presentToast('Login bem sucedido');
      })
    );

    this.subscriptions.push(
      this.authEffects.loginFailureNotification().subscribe((response) => {
        this.submitting = false;
        this.presentToast(response.error || 'Ocorreu um erro ao fazer login');
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  onSubmit() {
    if (this.submitting) {
      this.presentToast('Por favor, aguarde');
      return;
    }
    if (!this.loginForm.valid) {
      this.presentToast('Por favor, revise os campos');
      return;
    }

    this.submitting = true;
    const { email, password } = this.loginForm.value;
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }
  
  async loginWithGoogle() {
    let googleUser = await GoogleAuth.signIn();
    console.log(googleUser);
  }

  public signOut(){
    GoogleAuth.signOut();
  }
}
