import { NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';




@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent implements OnInit, OnDestroy {
  menuOpen = false;
  isLoggedIn = false;
  userName: string | null = null;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    if (width > 768 && this.menuOpen) {
      this.menuOpen = false;
    }
  }

  ngOnInit() {

    if (window.innerWidth > 768) {
      this.menuOpen = false;
    }
    this.checkLoginStatus();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoginStatus();
    });
    window.addEventListener('storage', () => this.checkLoginStatus());
  }

  ngOnDestroy() {
    
  }

  checkLoginStatus() {
    const loginData = sessionStorage.getItem('login');
    if (loginData) {
      this.isLoggedIn = true;
      this.userName = JSON.parse(loginData).nombre || null;
    } else {
      this.isLoggedIn = false;
      this.userName = null;
    }
  }

  logout() {
    sessionStorage.removeItem('login');
    this.isLoggedIn = false;
    this.userName = null;
    alert('Has cerrado sesión correctamente.');
    this.router.navigate(['/']);
  }
}
