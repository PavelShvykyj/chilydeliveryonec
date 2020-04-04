import { IOrder } from './../../models/order';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersDatasourseService } from '../orders.datasourse.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Subscription } from 'rxjs';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { selectAllOrders } from '../order.selectors';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {

  ordersusbs:Subscription
  allorders: IOrder[];
  orders: IOrder[];
  blocklenth:number = 5;
  startindex:number = 0;
  blocks:number[] = [0];

  constructor(private fdborders: OrdersDatasourseService,private store: Store<AppState>) { }

  ngOnInit() {
    this.fdborders.OdrdersChangesStart();
    this.ordersusbs = this.store.pipe(select(selectAllOrders))
    .subscribe(orders=>{
      this.allorders=orders.filter(el=>el.desk.length==0);
      this.UpdateBlocks(orders.length);
      this.OnBlockClick(0);
      this.startindex = 0;
    });
  }

  ngOnDestroy() {
    this.fdborders.OdrdersChangesStop();
    this.ordersusbs.unsubscribe();
  }

  OnBlockClick(block) {
    this.startindex = block;
    this.orders = this.allorders.slice(this.startindex,this.startindex+ this.blocklenth)  ;
  }

  UpdateBlocks(quontity:number) {
    this.blocks = [];
    this.startindex = 0;
    let index = 0;
    do {
      this.blocks.push(index);
      index = index + this.blocklenth;
    } while (index<quontity)
  }

}
