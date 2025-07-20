import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [FormsModule, NgIf]
})
export class RegisterComponent {
  nombre = '';
  apellido = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  onRegister() {
  const user = {
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    password: this.password
  };

  const users = JSON.parse(sessionStorage.getItem('users') || '[]');
  users.push(user);

  sessionStorage.setItem('users', JSON.stringify(users));
  alert('Registro exitoso. Ya puedes iniciar sesión.');

  sessionStorage.setItem('login', JSON.stringify(user));

  this.router.navigate(['/']);
}
}