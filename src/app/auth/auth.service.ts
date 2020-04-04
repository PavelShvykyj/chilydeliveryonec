import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';
import { AuthStausChanged } from './reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState$: Observable<firebase.User>
  private email : string;
  private pass  : string;


  constructor(private afAuth: AngularFireAuth, private store: Store<AppState>) {
    this.authState$ = this.afAuth.authState;
    this.authState$.subscribe(user => {this.store.dispatch(AuthStausChanged({user}))});
    

  }

  get user(): Observable<firebase.User> {
    return this.authState$;
  }

  SignInWithEmail(email:string,password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
  }

  LogOut() {
    this.afAuth.auth.signOut();

  }

  set relogemail(value) {
    this.email=value
  }

  set relogpass(value) {
    this.pass=value;
  } 

  Relog() {
    this.afAuth.auth.signOut()
    .then(res=> this.SignInWithEmail(this.email,this.pass))
    .catch(err=> this.SignInWithEmail("",""))

  }

}




