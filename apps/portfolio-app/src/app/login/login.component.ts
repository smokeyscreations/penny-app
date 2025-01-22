import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ButtonModule, FormsModule, CheckboxModule, InputTextModule, FloatLabelModule, DividerModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
