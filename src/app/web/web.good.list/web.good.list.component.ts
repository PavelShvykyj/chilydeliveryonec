import { selectGoodsByParent } from './../web.selectors';
import { IWEBGood } from './../../models/web.good';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebGoodsDatasourseService } from '../web.goods.datasourse.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { LentaToolbarComponent } from 'src/app/baseelements/lenta-toolbar/lenta-toolbar.component';
import { Observable } from 'rxjs';
import { ITolbarCommandsList } from 'src/app/models/toolbar.commandslist';
import { IBaseGood } from 'src/app/models/base.good';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Update } from '@ngrx/entity';
import { statusWebSelectedGanged } from '../web.actions';

@Component({
  selector: 'webgoodlist',
  templateUrl: './web.good.list.component.html',
  styleUrls: ['./web.good.list.component.scss']
})
export class WebGoodListComponent implements OnInit {

  @ViewChild(LentaToolbarComponent, {static: false})
  toolbar: LentaToolbarComponent;

  elements$ : Observable<IWEBGood[]>; //= this.ds.dataSourse$;
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

  constructor(public ds : WebGoodsDatasourseService, private store: Store<AppState>) { }

  ngOnInit() {
    this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:undefined}));
  }

  OnGoodClicked(item: IWEBGood) {
    if(item.isFolder) {
      //this.ds.GetList(item.id);
      this.elements$ = this.store.pipe(select(selectGoodsByParent,{parentid:item.id})); 
      this.toolbar.AddElement(item);
    } else {
     
    }

  }

  OnGoodCheked(event:MatCheckboxChange,item: IWEBGood) {
    const update : Update<IWEBGood> = {
      id:item.id,
      changes:{isSelected:event.checked}
    }
    this.store.dispatch(statusWebSelectedGanged({update}));

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
        

        break;
      case "download":
        alert("Команда download");
        break;
        
      default:
        break;
    }


  }


}
