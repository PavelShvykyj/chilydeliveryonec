import { selectIsLoggedIn, selectUserData } from './auth/auth.selectors';
import { Observable } from 'rxjs';
import { LoadOptions } from './option.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AppState } from './reducers';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrdersDatasourseService } from './orders/orders.datasourse.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deliveryonec';
  isLoggedIn$:Observable<boolean>;
  pictureUrl$:Observable<string>;
  isFullVersion:boolean = false;

  constructor(
    private store : Store<AppState>,
    private auth : AuthService,
    private router : Router,
    private rtdb : OrdersDatasourseService
    ) {
    this.isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));
    this.pictureUrl$ = this.store.pipe(select(selectUserData), map(userdata=>   userdata.avatar));
  }

  LogOut() {
    this.auth.LogOut();
    this.router.navigateByUrl("login");
  }

  Relog() {
    this.auth.Relog();
    
  } 

  ngOnInit() {
    this.store.dispatch(LoadOptions());
  }

  OnExternal1CValueChange(el){
    const data1C = JSON.parse(el.value);
    const point = data1C.point;
    switch (point) {
      case "options":
        this.store.dispatch(LoadOptions());
        break;
      case "formoption" :
        this.isFullVersion = data1C.formoption;
      case "autologin" :
        this.auth.SignInWithEmail(data1C.email,data1C.password)
        .then(res => {
          this.auth.relogemail=data1C.email;
          this.auth.relogpass=data1C.password;
          this.router.navigateByUrl('orders');
        })
        .catch(err => alert("НЕ ВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ !!!"));
        break;
      case "setdesk" :
        this.rtdb.SetOrderChiled(data1C.id,data1C.name,data1C.value);
        break;
      case "deleteorder" :
        this.rtdb.RemoveOrder(data1C.id);
        break;
      default:
        break;
    }
    
    
  }


}
