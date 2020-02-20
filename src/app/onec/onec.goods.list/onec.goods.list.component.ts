import { selectGoodsByParent, selectNotInWeb, selectGoodByName, selectGoodBySelection, selectGoodBySelectionForUpload } from './../onec.selectors';
import { AppState } from './../../reducers/index';
import { Store, select } from '@ngrx/store';
import { ITolbarCommandsList } from './../../models/toolbar.commandslist';
import { element } from 'protractor';

import { Component, OnInit, ViewChild } from '@angular/core';
import { OnecGoodsDatasourseService } from '../onec.goods.datasourse.service';
import { LentaToolbarComponent } from 'src/app/baseelements/lenta-toolbar/lenta-toolbar.component';
import { IONECGood } from 'src/app/models/onec.good';
import { Observable } from 'rxjs';
import { IBaseGood } from 'src/app/models/base.good';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { tap, first, finalize, map } from 'rxjs/operators';
import { loadAllGoods, statusSelectedGanged } from '../onec.actions';
import { Update } from '@ngrx/entity';
import { uploadOnecSelected } from 'src/app/web/web.actions';



@Component({
  selector: 'onecgoodslist',
  templateUrl: './onec.goods.list.component.html',
  styleUrls: ['./onec.goods.list.component.scss']
})
export class OnecGoodsListComponent implements OnInit {

  @ViewChild(LentaToolbarComponent, {static: false})
  toolbar: LentaToolbarComponent;

  elements$ : Observable<IONECGood[]>; //= this.ds.dataSourse$;
  toolbarcommands : ITolbarCommandsList[] = [
    {
      commandName: "refresh",
      buttonName:"",
      iconeName:'refresh'
    },

    {
      commandName: "upload",
      buttonName:"",
      iconeName:'cloud_upload'
    },

    {
      commandName: "difference",
      buttonName:"",
      iconeName:'call_split'
    }

  ]

  NameFilterValue:string="";

  constructor(public ds : OnecGoodsDatasourseService, private store: Store<AppState>) { }

  ngOnInit() {
    this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:undefined})); 
  }

  OnGoodClicked(item: IONECGood) {
    if(item.isFolder) {
      //this.ds.GetList(item.id);
      this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:item.id})); 
      this.toolbar.AddElement(item);
    } else {
     
    }

  }

  OnGoodCheked(event:MatCheckboxChange,item: IONECGood) {
    const update : Update<IONECGood> = {
      id:item.id,
      changes:{isSelected:event.checked}
    }
    this.store.dispatch(statusSelectedGanged({update}));

    
  }


  OnLentaElementClicked(event : IBaseGood) {
    if(event == undefined) {
      
      
      this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:undefined})); 
    } else {
      
      this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:event.id})); 
    }
    
  }

  OnToolbarCommandClicked(event : string) {
    switch (event) {
      case "refresh":
        
        this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:this.GetCurrentParent()})); 
        this.NameFilterValue='';
        break;
      case "upload":
        this.store.pipe(
          select(selectGoodBySelectionForUpload),
          first())
        .subscribe(
          selectedgoods  => {selectedgoods.forEach(good => this.store.dispatch(uploadOnecSelected({good})))}
        );
        

        break;
      case "difference":
        this.elements$ = this.store.pipe(select(selectNotInWeb)); 
        break;
        
      default:
        break;
    }


  }

  OnNameFilterInput() {
   

    if(this.NameFilterValue.length == 0 ){
      
      this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:this.GetCurrentParent()})); 
    } else {
      // заменям пробелы \s* на любое количество любых сиволов (".*")
      const reg = this.NameFilterValue.replace( /\s*/g, ".*");
      
      this.elements$ = this.store.pipe(select(selectGoodByName,reg));
    }
    
    
  }

  OnNameFilterCleared() {
    this.NameFilterValue='';
    this.OnNameFilterInput();
  }
  
  GetCurrentParent() : string | undefined {
    let parentid : string = undefined;
    if( this.toolbar.lenta.length != 0) {
      parentid = this.toolbar.lenta[this.toolbar.lenta.length-1].id;
    }
    return  parentid;

  }

}
