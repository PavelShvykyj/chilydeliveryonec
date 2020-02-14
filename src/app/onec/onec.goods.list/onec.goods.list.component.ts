import { selectGoodsByParent } from './../onec.selectors';
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
import { tap, first } from 'rxjs/operators';
import { loadAllGoods } from '../onec.actions';

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
      commandName: "download",
      buttonName:"",
      iconeName:'cloud_download'
    }

  ]

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
    //alert(item.name+" "+event.checked);
  }


  OnLentaElementClicked(event : IBaseGood) {
    if(event == undefined) {
      //this.ds.GetList(undefined);
      this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:undefined})); 
    } else {
      //this.ds.GetList(event.id);
      this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:event.id})); 
    }
    
  }

  OnToolbarCommandClicked(event : string) {
    switch (event) {
      case "refresh":
        //this.ds.GetList(undefined);
        this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:undefined})); 
        break;
      case "upload":
        alert("Команда upload");
        //this.store.dispatch(loadAllGoods());

        break;
      case "download":
        alert("Команда download");
        break;
        
      default:
        break;
    }


  }

}
