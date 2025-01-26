import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserError, selectUserLoading, selectUserState } from '../../store/user-store/user.selector';
import * as UserActions from '../../store/user-store/user.actions';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  token: string | null = null;
  
  form: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  });

  error$ = this.store.select(selectUserError);
  loading$ = this.store.select(selectUserLoading);

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.store.select(selectUserState).subscribe();
  }

  onSubmit() {
    if (this.form.invalid || !this.token) return;

    const newPassword = this.form.value.newPassword;
    const confirmNewPassword = this.form.value.confirmNewPassword;

    if (newPassword !== confirmNewPassword) {
      return;
    }

    this.store.dispatch(UserActions.resetPassword({
      newPassword,
      token: this.token
    }));
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
