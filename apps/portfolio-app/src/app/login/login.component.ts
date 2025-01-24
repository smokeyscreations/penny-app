import { Component } from '@angular/core';
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
import { of } from 'rxjs';

function emailIsUnique(control: AbstractControl){
  if (control.value !== 'test@example.com'){
    return of(null);
  }
  return of({notUnique: true});
}
@Component({
  selector: 'app-login',
  imports: [CommonModule, ButtonModule, FormsModule, CheckboxModule, InputTextModule, FloatLabelModule, DividerModule, PasswordModule, IconField, InputIcon, IftaLabelModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      
    })
  });

  onSubmit(){
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
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
