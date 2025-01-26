
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { select, Store } from '@ngrx/store';
import * as UserActions from '../../store/user-store/user.actions';
import { selectChangePasswordError, selectChangePasswordLoading } from '../../store/user-store/user.selector';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    StepperModule,
    ButtonModule,
    ToggleButtonModule,
    NgClass,
    RouterModule

  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  // Correctly declare the observables
  loading$: Observable<boolean>;
  error$: Observable<any>;


  activeStep = 0;
  // Define the form with corrected validator
  form = new FormGroup({
    currentPassword: new FormControl<string>('',{
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
    newPassword: new FormControl<string>('',{
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
    confirmPassword: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  }, { validators: this.passwordsMatchValidator });

  // Manage subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store, private router: Router) {
    // Initialize the observables with store selectors
    this.loading$ = this.store.pipe(select(selectChangePasswordLoading));
    this.error$ = this.store.pipe(select(selectChangePasswordError));
  }

  ngOnInit(): void {
    this.activateCallback(0);
    // Subscribe to loading$ to detect when the password change process completes
    const loadingSub = this.loading$.subscribe((loading: boolean) => {
      if (!loading) {
        // Check for errors
        this.error$.pipe(take(1)).subscribe(error => {
          if (!error) {
            // No error, proceed to confirmation step
            this.activeStep = 2;
            this.form.reset();
          }
          // If there's an error, remain on the current step and display the error in the template
        });
      }
    });

    // Add the subscription to the subscription manager
    this.subscriptions.add(loadingSub);
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  activateCallback(step: number): void {
    if (step === 2 && this.activeStep === 1) {
      this.onSubmit();
    } else {
      this.activeStep = step;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.form.value;

    if (newPassword !== confirmPassword) {
      console.error('New Password and Confirm Password do not match.');
      return;
    }

    // Dispatch the changePassword action
    this.store.dispatch(UserActions.changePassword({ oldPassword: currentPassword!, newPassword: newPassword! }));
    this.activateCallback(0);
    this.store.dispatch(UserActions.logout());
    this.router.navigate(['/login']);
    console.log({ currentPassword, newPassword, confirmPassword });
  }

  // Corrected validator function
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
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
