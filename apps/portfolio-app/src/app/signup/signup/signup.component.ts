import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FloatLabelModule, ButtonModule, DividerModule, IftaLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent { 

  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('',{
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
    agree: new FormControl(false, {
      validators: [Validators.required]
    }),
  });

  onSubmit(){
    this.form.reset();
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
