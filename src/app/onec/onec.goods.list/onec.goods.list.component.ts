import { element } from 'protractor';

import { Component, OnInit, ViewChild } from '@angular/core';
import { OnecGoodsDatasourseService } from '../onec.goods.datasourse.service';
import { LentaToolbarComponent } from 'src/app/baseelements/lenta-toolbar/lenta-toolbar.component';
import { IONECGood } from 'src/app/models/onec.good';
import { Observable } from 'rxjs';
import { IBaseGood } from 'src/app/models/base.good';

@Component({
  selector: 'onecgoodslist',
  templateUrl: './onec.goods.list.component.html',
  styleUrls: ['./onec.goods.list.component.scss']
})
export class OnecGoodsListComponent implements OnInit {

  @ViewChild(LentaToolbarComponent)
  private toolbar: LentaToolbarComponent;

  private elements$ : Observable<IONECGood[]> = this.ds.dataSourse$;

  constructor(private ds : OnecGoodsDatasourseService) { }

  ngOnInit() {
    
  }

  OnLentaElementClicked(event : IBaseGood) {
    if(event == undefined) {
      this.ds.GetList(undefined);
    } else {
      this.ds.GetList(event.parentid);
    }
    
  }


}
