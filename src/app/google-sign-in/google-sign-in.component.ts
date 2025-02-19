import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `<button (click)="login()">Sign in with Google</button>
    <button (click)="getData()">Get Protected Data</button>
    <button (click)="logout()">Logout</button>`,
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  token: string | undefined = '';

  async login() {
    this.token = await this.authService.googleSignIn();
    console.log('User Token:', this.token);
  }

  async getData() {
    if (!this.token) {
      console.log('Please sign in first');
      return;
    }
    const data = await this.authService.getProtectedData(this.token);
    console.log('Protected API Data:', data);
  }

  logout() {
    this.authService.signOut().then(() => console.log('User signed out'));
  }
}
