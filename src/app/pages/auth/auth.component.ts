import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'register' = 'login';
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  toggle() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }

  submit() {
    if (this.form.invalid) return;

    const { name, email, password } = this.form.value;

    if (this.mode === 'login') {
      this.auth.login(email, password).subscribe(() => this.router.navigate(['/']));
    } else {
      this.auth.register(name, email, password).subscribe(() => this.mode = 'login');
    }
  }
}
