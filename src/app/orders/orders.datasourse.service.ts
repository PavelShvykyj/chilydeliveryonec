import { IOrder, IOrderChanges } from './../models/order';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, BehaviorSubject, combineLatest, from, of, throwError, Subscription } from 'rxjs';
import { map, filter, concatMap, first, tap, catchError, take } from 'rxjs/operators';


import { select, Store, props } from '@ngrx/store';
import { AppState } from '../reducers';
import { Update } from '@ngrx/entity';

import { environment } from 'src/environments/environment';

import * as firebase from 'firebase/app';
import 'firebase/database';
import { Itparams } from '../models/telegram';
import { OrderActions } from './order.action.types';
import { selectOptionFilialName } from '../option.selectors';
import { TelegramService } from '../services/telegram.service';






@Injectable({
  providedIn: 'root'
})
export class OrdersDatasourseService {

  filial:string='empty';
 

  constructor(private db: AngularFireDatabase,
              private store: Store<AppState>
              ) {

      this.store.pipe(select(selectOptionFilialName))
      .subscribe(res => {
        this.filial=res;
        this.OdrdersChangesStop();
        this.OdrdersChangesStart();
        this.ConnectionDetectStart();
      } );
     }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  get filialname() {
    return this.filial;
  }

  async GetTelegramParams() {
    const snapparams = await this.db.database.ref('telegram').once('value');
    let tparams : Itparams = {};
    
    snapparams.forEach(snap => { tparams[snap.key]=snap.val()}  );
    return tparams

  }

  GetOrders(): Observable<IOrder[]> {
    return from(this.db.database.ref('orders').equalTo(this.filial,'filial').once('value'))
      .pipe(map(orderssnap => {
        const orders: IOrder[] = [];

        orderssnap.forEach(childSnapshot => {
          orders.push({ ...childSnapshot.val(), id: childSnapshot.key })
        });
        return orders;
      }), take(1));
  }

  GetTformatedMessage(order): string {
    let message: string = `<b>НОВЫЙ ЗАКАЗ : ${order.externalid}</b>
    <b>Филиал : </b> ${order.filial} 
    <i>Адрес: </i> ${order.addres} 
    <i>Тел. : </i> ${order.phone} 
    <i>Коммент : </i> ${order.comment}`;
    // <i>ТОВАРЫ : </i>
    // `;

    // order.entities.forEach(element => {
    //   message = message + `${element.good.name} :  ${element.quantity}
    //   `
    // });


    return message;
};



  ChangeFilial(order:IOrder,filial:string) {
    return this.db.database.ref(`orders/${order.id}/filial`).set(filial);

  } 

  SetOrderChiled(id,name,value) {
    return this.db.database.ref(`orders/${id}/${name}`).set(value);

  }

  CreateOrder(neworder) {
    
    
    return from(this.db.database.ref('orders').push({...neworder, creation: this.timestamp}))
    .pipe(
      
      catchError(err => {
      neworder.comment = JSON.stringify(err);
      return throwError(neworder)}
      ),
    map(()=>neworder)
    );
  }







  async RemoveOrder(id:string) : Promise<void> {
    return this.db.database.ref('orders/'+id).remove();
  }

  

  OnOrdersChanged(data: firebase.database.DataSnapshot) {
    
    this.store.dispatch(OrderActions.OrdersUpdated({ orders: [{ ...data.val(), id: data.key }] }));
  }

  OnOrdersRemoved(data: firebase.database.DataSnapshot) {
    this.store.dispatch(OrderActions.OrdersDeleted({ orders: [data.key] }))
  }

  OdrdersChangesStart() {
    console.log('this.filial',this.filial);
    this.db.database.ref('orders').orderByChild('filial').equalTo(this.filial).on('child_removed', this.OnOrdersRemoved.bind(this));
    this.db.database.ref('orders').orderByChild('filial').equalTo(this.filial).on('child_changed', this.OnOrdersChanged.bind(this));
    this.db.database.ref('orders').orderByChild('filial').equalTo(this.filial).on('child_added', this.OnOrdersChanged.bind(this));
  }

  OdrdersChangesStop() {
    this.db.database.ref('orders').off('child_removed');
    this.db.database.ref('orders').off('child_changed');
    this.db.database.ref('orders').off('child_added');
  }

  ConnectionDetectStart() {
    this.db.database.ref(".info/connected").on("value",this.OnConnectionStatusChanged.bind(this) );
  }

  OnConnectionStatusChanged(data: firebase.database.DataSnapshot) {
    let Connected  =  {
      'status':data.val(),
      'filial':this.filial,
      'date': new Date()
    };

    if(xForm1C == undefined)  {
      //alert('ПОТЕРЯНА СВЯЗЬ С ИНТЕНЕТ И 1С ПЕРЕЗАГРУЗИТЕ ПРОГРАММУ!!!');
    } else {
      xForm1C.OnConnectionStatusChanged(JSON.stringify(Connected));
    }

    

  }

}
