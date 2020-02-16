import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { IWEBGood } from '../models/web.good';
import { IONECGood } from '../models/onec.good';
import { IGoodsListDatasourse } from '../models/goods.list.datasourse';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, concatMap, first, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { areAllWebGoodsLoaded } from './web.selectors';
import { AppState } from '../reducers';
import { environment } from 'src/environments/environment';

// firebase.initializeApp(environment.firebase);
// const idfield = firebase.firestore.FieldPath.documentId();

@Injectable({
  providedIn: 'root'
})
export class WebGoodsDatasourseService implements IGoodsListDatasourse {

  private dataEventer: BehaviorSubject<IWEBGood[]> = new BehaviorSubject([]);
  public dataSourse$: Observable<IWEBGood[]> = this.dataEventer.asObservable();

  private fake: IWEBGood[] = [
    {
      isFolder: true,
      parentid: undefined,
      name: "fake folder 1",
      filials: [],
      id: "1",
      isSelected: false,
      externalid: undefined
    },

    {
      isFolder: true,
      parentid: undefined,
      name: "fake folder long long name 2",
      filials: [],
      id: "2",
      isSelected: false,
      externalid: undefined
    },

    {
      isFolder: false,
      parentid: undefined,
      name: "fake item 1 with long name пица ароматная большая ням ням",
      filials: ["vopak", "dastor"],
      id: "3",
      isSelected: false,
      externalid: undefined
    },

    {
      isFolder: false,
      parentid: undefined,
      name: "fake item 2",
      filials: ["vopak", "dastor", "luxor"],
      id: "4",
      isSelected: false,
      externalid: undefined
    }


  ]



  constructor(private db: AngularFirestore, private store: Store<AppState>) { }

  GetList(parentID: string | undefined) {
    console.log("web  get lits");
    this.store.pipe(
      select(areAllWebGoodsLoaded),
      filter(WebGoodsLoaded => {console.log("WebGoodsLoaded",WebGoodsLoaded);  return !WebGoodsLoaded} ),
      concatMap(WebGoodsLoaded => this.db.collection('web.goods').snapshotChanges().pipe(map(res => { console.log(res); return res.map(element  => {return {...(element.payload.doc.data() as object) ,isSelected:false, id:element.payload.doc.id}} ) as IWEBGood[];}   ))),
      first(),
      tap(res => this.dataEventer.next(res))
      ).subscribe();
  }
}
