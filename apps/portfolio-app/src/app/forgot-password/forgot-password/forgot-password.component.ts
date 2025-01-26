import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserError, selectUserLoading, selectUserState } from '../../store/user-store/user.selector';
import * as UserActions from '../../store/user-store/user.actions';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, MessageModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit{
  private store = inject(Store);

  resetError: string | null = null;
  validationMesage = signal<string | null>('');
  isSubmitted = signal<boolean>(false);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]},
    ),
  });

  error$!: Observable<any>;
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.error$ = this.store.select(selectUserError);
    this.loading$ = this.store.select(selectUserLoading);

    this.store.select(selectUserState).subscribe();
  }

  onSubmit() {
    if (this.form.invalid){
      this.resetError = 'failed';
      this.validationMesage.set('Email is invalid.')
      return;
    } 

    this.resetError = 'success';
    this.isSubmitted.set(true);
    this.validationMesage.set('Your email has been sent to the associated account. Please check your mail for the reset link.');
    const email = this.form.value.email!;
    this.store.dispatch(UserActions.forgotPassword({ email }));
  }

  buttonDesignToken = {
    'border.radius': '6px',
    'primary.background': '#131C22',
    'primary.border.color': 'none',
    'primary.color': 'white',
    'primary.hover.color': 'white',
    'primary.hover.background': '#1C2933',
    'primary.hover.border.color': 'none',
    'primary.active.background': '#1C2933',
    'primary.active.color': '#BACBD9',
    'primary.active.border.color': 'none',
  };
}