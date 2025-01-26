import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/user-store/user.actions';
import { selectCurrentUser, selectUserError } from '../store/user-store/user.selector';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RedirectService } from '../shared/button/redirect.service';
import { User } from '../users/user.model';

function emailIsUnique(control: AbstractControl){
  if (control.value !== 'test@example.com'){
    return of(null);
  }
  return of({notUnique: true});
}
@Component({
  selector: 'app-login',
  imports: [CommonModule, ButtonModule, FormsModule, CheckboxModule, InputTextModule, FloatLabelModule, DividerModule, PasswordModule, IconField, InputIcon, IftaLabelModule, ReactiveFormsModule, ToastModule, MessageModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  redirectUrl = signal<string>('');

  error$!: Observable<any>;
  user$!: Observable<any>;

  logInError: string | null = null;
  validationMesage = signal<string | null>('');


  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      
    })
  });

  constructor(private store: Store, private redirectService: RedirectService) {
    this.error$ = this.store.select(selectUserError);
    this.user$ = this.store.select(selectCurrentUser);
  }

  ngOnInit() {
    this.redirectUrl.set(this.redirectService.getRedirectUrl());

    this.error$.subscribe((err) => {
      if (err) {
        this.logInError = 'Login failed';
        this.validationMesage.set('Email and password do not match.');
        console.error('Login failed:', err);

      }else{
        this.logInError = null;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    const userSub = this.user$.subscribe((user) =>{
      if(user){
        this.router.navigateByUrl(this.redirectUrl());
      }
    })

    this.store.dispatch(UserActions.login({ email: email!, password: password! }));

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
