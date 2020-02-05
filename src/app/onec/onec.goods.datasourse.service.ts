import { IGoodsListDatasourse } from './../models/goods.list.datasourse';
import { Injectable } from '@angular/core';
import { IBaseGood } from '../models/base.good';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IONECGood } from '../models/onec.good';

@Injectable({
  providedIn: 'root'
})
export class OnecGoodsDatasourseService implements IGoodsListDatasourse{

  private dataEventer : BehaviorSubject<IONECGood[]> = new BehaviorSubject([]);
  public dataSourse$ : Observable<IONECGood[]> = this.dataEventer.asObservable();

  constructor() { }

  GetList(parentID:string | undefined)  {
    if(xForm1C == undefined) {
      this.dataEventer.next([]);
    } else {
      this.dataEventer.next(xForm1C.GetList(parentID));
    }
  }
}
