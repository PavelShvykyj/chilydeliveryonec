import { IGoodsListDatasourse } from '../../models/goods.list.datasourse';
import { IWEBGood } from '../../models/web.good';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { IBaseGood } from '../../models/base.good';



interface ILentaElement extends IBaseGood {
  last: boolean,
  parity: boolean
}


@Component({
  selector: 'lenta-toolbar',
  templateUrl: './lenta-toolbar.component.html',
  styleUrls: ['./lenta-toolbar.component.scss']
})
export class LentaToolbarComponent implements OnInit {

  private lenta: ILentaElement[] = [];
  @Input('dataSourse') dataSourse: IGoodsListDatasourse;
  @Output('OnElementClicked') OnElementClicked = new EventEmitter<IBaseGood>();

  @ViewChild(LentaToolbarComponent)
  private toolbar: LentaToolbarComponent;

  constructor() { }

  ngOnInit() {
    this.lenta = [
    ]

  }

  AddElement(item: IBaseGood): void {
    if(item == undefined) {
      return
    }

    if (this.lenta.length == 0) {
      const LentaElement: ILentaElement = <ILentaElement>{
        parity: false,
        last: true,
        ...item
      }
      this.lenta.push(LentaElement);
      return;
    } else {
      const newElemnt: ILentaElement = <ILentaElement>{
        parity: !this.lenta[this.lenta.length].parity,
        last: true,
        ...item
      }
      this.lenta[this.lenta.length].last = false;
      this.lenta.push(newElemnt);
    }
  }

  ElementClicked(item: ILentaElement | undefined) {
    if(item == undefined) {
      this.lenta = [];
    } else {
      this.lenta.splice( this.lenta.indexOf(item));
    }
    
    this.OnElementClicked.emit(item); 
  }

}
