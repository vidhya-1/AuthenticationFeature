import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  async googleSignIn() {
    const userCredential = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    const token = await userCredential.user?.getIdToken();
    console.log('Firebase ID Token:', token);
    return token;
  }

  async getProtectedData(token: string) {
    const headers = new HttpHeaders({ Authorization: token });
    return lastValueFrom(
      this.http.get('http://localhost:4000/protected', { headers })
    );
  }
  signOut() {
    return this.afAuth.signOut();
  }
}
