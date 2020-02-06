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

  private fake : IONECGood[] = [
    {
      isFolder:true,
      parentid:undefined,
      name: "fake folder 1",
      filial: "vopak"
    },

    {
      isFolder:true,
      parentid:undefined,
      name: "fake folder 2",
      filial: "vopak"
    },

    {
      isFolder:false,
      parentid:undefined,
      name: "fake item 1 with long name пица ароматная большая ням ням",
      filial: "vopak"
    },

    {
      isFolder:false,
      parentid:undefined,
      name: "fake item 2",
      filial: "vopak"
    }


  ]

  constructor() { }

  GetList(parentID:string | undefined)  {
    if(xForm1C == undefined) {
      this.dataEventer.next(this.fake);
    } 
    else {
      const content: IONECGood[] =  JSON.parse(xForm1C.GetList(parentID)).goods;
      this.dataEventer.next(content);
    }
  }
}
