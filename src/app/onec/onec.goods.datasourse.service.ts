
import { Update } from '@ngrx/entity';
import { element } from 'protractor';

import { IGoodsListDatasourse } from './../models/goods.list.datasourse';
import { Injectable } from '@angular/core';
import { IBaseGood } from '../models/base.good';
import { Observable, of, BehaviorSubject, from } from 'rxjs';
import { IONECGood } from '../models/onec.good';
import { OptionState } from '../option.reducer';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, map, first, filter, concatMap } from 'rxjs/operators';
import { WebGoodsDatasourseService } from '../web/web.goods.datasourse.service';

@Injectable({
  providedIn: 'root'
})
export class OnecGoodsDatasourseService implements IGoodsListDatasourse{

  private dataEventer : BehaviorSubject<IONECGood[]> = new BehaviorSubject([]);
  public dataSourse$ : Observable<IONECGood[]> = this.dataEventer.asObservable();

  private fake : IONECGood[] = []

  constructor(private fdb: AngularFirestore, private fdbservise:WebGoodsDatasourseService) {
    
    
    


   }

  GetList(parentID:string | undefined)  {
    if(xForm1C == undefined) {
      for (let index = 0; index < 500; index++) {
        const element = {
          isFolder:false,
          parentid:undefined,
          name: "fake item "+index,
          filial: "vopak",
          id:(4+index).toString(),
          isSelected:false,
          externalid:"PCcbK1WrZPSXYXMpFXfJ"
        }
        this.fake.push(element);
      }
      
      
      
      
      this.dataEventer.next(this.fake);
    } 
    else {
      const content: IONECGood[] =  JSON.parse(xForm1C.GetList(parentID)).goods;
      this.dataEventer.next(content);
    }
  }

  UpdateExternalId(onecid:string,externalid:string) : Observable<IONECGood>  {
    

    if(xForm1C==undefined) {
      
      const fakeitem = this.fake.filter(element => element.id == onecid)[0];
      fakeitem.externalid = externalid;
      return of(fakeitem);
    } else {
      const updatedGood : IONECGood = JSON.parse(xForm1C.UpdateExternalId(onecid,externalid))  ;
      return of(updatedGood)
  
    }
  }

  DeleteElement( good: Update<IONECGood>, externalid:string) : Observable<Update<IONECGood>>  {
    /// нельзя удалять привязанные елементы поэтому если елемент привязан - изменения содержат только снятие галки
    
    return  this.fdb.collection('web.goods', ref=>ref.where("filials",'array-contains',externalid))
    .snapshotChanges()
    .pipe(
        map(goods => goods.length),
        first(),
        concatMap(count => {
          
          if (count == 0) {
            return this.fdbservise.DeleteOnecGood(externalid).pipe(map(()=>{
              if(xForm1C != undefined) {
                xForm1C.UnchainElement(externalid);
              }  
                return good;
              }))
          } else {
            good.changes.externalid=externalid;
            return of(good)
          }
        }));
  }

  LoadOptions() : Observable<{options:OptionState}> {
    if(xForm1C == undefined) {
      return of({options:{filialname:"luxor"}});
    } else {
      const options : {options:OptionState} = JSON.parse(xForm1C.LoadOptions()) ;
      return of(options);
    }
  }

}
