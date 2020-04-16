import { selectIsLoggedIn, selectUserData } from './auth/auth.selectors';
import { Observable, Subscription } from 'rxjs';
import { LoadOptions } from './option.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { AppState } from './reducers';
import { AuthService } from './auth/auth.service';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrdersDatasourseService } from './orders/orders.datasourse.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'deliveryonec';
  isLoggedIn$:Observable<boolean>;
  pictureUrl$:Observable<string>;
  isFullVersion:boolean = false;
  breakpointsubs: Subscription; 

  constructor(
    private store : Store<AppState>,
    private breakpointObserver: BreakpointObserver,
    private auth : AuthService,
    private router : Router,
    private rtdb : OrdersDatasourseService
    ) {
    this.isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn),tap(isLoggedin=>{
      if (isLoggedin) {
        this.rtdb.OdrdersChangesStart();
        this.router.navigateByUrl('orders');
      }
    }));
    this.pictureUrl$ = this.store.pipe(select(selectUserData), map(userdata=>   userdata.avatar));




  }

  LogOut() {
    this.auth.LogOut();
    this.router.navigateByUrl("login");
  }

  Relog() {
    this.auth.Relog().then(()=>this.router.navigateByUrl("orders"));
    
  } 

  ngOnInit() {
    this.store.dispatch(LoadOptions());
    this.ListenBreakPoints()

  }

  ngOnDestroy() {
    this.rtdb.OdrdersChangesStop();
    this.breakpointsubs.unsubscribe()
  }

  ListenBreakPoints() {
    this.breakpointsubs = this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isFullVersion=true
        } else {
          this.isFullVersion=false;
          this.router.navigateByUrl('orders');
        }
      });
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
      case "ping" :  
        console.log("ping");
      case "autologin" :
        this.auth.relogemail=data1C.email;
        this.auth.relogpass=data1C.password;
        
        this.auth.SignInWithEmail(data1C.email,data1C.password)
        .then(res => {
          
          this.router.navigateByUrl('orders');
        })
        .catch(err => alert("НЕ ВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ !!!"));
        break;
      case "setdesk" :
        this.rtdb.SetOrderChiled(data1C.id,data1C.name,data1C.value);
        break;
      case "deleteorder" :
        this.rtdb.RemoveOrder(data1C.id)
        .then(res=> xForm1C.OnSucsessOrderRemove(data1C.id))
        .catch(err=>xForm1C.OnErrorOrderRemove(data1C.id,JSON.stringify(err)));
        break;
      default:
        break;
    }
    
    
  }


}
