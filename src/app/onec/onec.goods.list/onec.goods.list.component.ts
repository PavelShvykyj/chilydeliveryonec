import { ITolbarCommandsList } from './../../models/toolbar.commandslist';
import { element } from 'protractor';

import { Component, OnInit, ViewChild } from '@angular/core';
import { OnecGoodsDatasourseService } from '../onec.goods.datasourse.service';
import { LentaToolbarComponent } from 'src/app/baseelements/lenta-toolbar/lenta-toolbar.component';
import { IONECGood } from 'src/app/models/onec.good';
import { Observable } from 'rxjs';
import { IBaseGood } from 'src/app/models/base.good';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'onecgoodslist',
  templateUrl: './onec.goods.list.component.html',
  styleUrls: ['./onec.goods.list.component.scss']
})
export class OnecGoodsListComponent implements OnInit {

  @ViewChild(LentaToolbarComponent)
  toolbar: LentaToolbarComponent;

  elements$ : Observable<IONECGood[]> = this.ds.dataSourse$;
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

  constructor(public ds : OnecGoodsDatasourseService) { }

  ngOnInit() {
    
  }

  OnGoodClicked(item: IONECGood) {
    if(item.isFolder) {
      this.ds.GetList(item.parentid);
      this.toolbar.AddElement(item);
    } else {
      
    }

  }

  OnGoodCheked(event:MatCheckboxChange,item: IONECGood) {
    alert(item.name+" "+event.checked);
  }


  OnLentaElementClicked(event : IBaseGood) {
    if(event == undefined) {
      this.ds.GetList(undefined);
    } else {
      this.ds.GetList(event.parentid);
    }
    
  }

  OnToolbarCommandClicked(event : string) {
    switch (event) {
      case "refresh":
        this.ds.GetList(undefined);
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
