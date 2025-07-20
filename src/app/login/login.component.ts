import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, NgIf]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
  const users = JSON.parse(sessionStorage.getItem('users') || '[]');

  const userFound = users.find((user: any) =>
    user.email === this.email && user.password === this.password
  );

  if (userFound) {
    sessionStorage.setItem('login', JSON.stringify(userFound));
    alert('Login correcto. ¡Bienvenido!');
    this.router.navigate(['/']);
  } else {
    alert('Login fallido. Email o contraseña incorrectos.');
  }
  }
}