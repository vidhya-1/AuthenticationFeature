import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from '../config/environment';
import { LoginComponent } from '../app/google-sign-in/google-sign-in.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, CommonModule, AngularFireAuthModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'authenticationFeature';
}
