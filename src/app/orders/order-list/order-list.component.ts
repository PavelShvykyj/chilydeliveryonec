import { IOrder } from './../../models/order';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, NgZone } from '@angular/core';
import { OrdersDatasourseService } from '../orders.datasourse.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Subscription, Observable } from 'rxjs';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { selectAllOrders } from '../order.selectors';
import { map, tap, share } from 'rxjs/operators';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy, AfterViewInit {

  ordersusbs:Subscription
  allorders$: Observable<IOrder[]>;
  orders$: Observable<IOrder[]>;
  orders: IOrder[];
  allorders: IOrder[];
  blocklenth:number = 5;
  startindex:number = 0;
  blocks:number[] = [0];
  lastupdate:Date = new Date();

  constructor(private fdborders: OrdersDatasourseService,
              private store: Store<AppState>,
              private ngZone : NgZone,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    
    this.ordersusbs = this.store.pipe(select(selectAllOrders),
               map(res=> {
                const orders = res.filter(el=>el.desk.length==0)  
                
                 return orders
                })).subscribe(orders=>{
                  this.allorders = orders
                  this.UpdateBlocks(this.allorders.length);
                  this.startindex=0;
                  this.UpdateGoodsview()
                  this.ngZone.run(() => {
                        this.lastupdate = new Date()
                      })
                });
               
                    
  }

  ngAfterViewInit() {
    this.UpdateGoodsview();
  }

  ngOnDestroy() {
    this.ordersusbs.unsubscribe();
  }

  UpdateGoodsview() {
    this.orders = this.allorders.slice(this.startindex,this.startindex+ this.blocklenth);
    this.changeDetector.markForCheck();
    
    // this.orders$ = this.allorders$.pipe(map(goods => {
    //   this.UpdateBlocks(goods.length);
    //   const res = goods.slice(this.startindex,this.startindex+ this.blocklenth);
    //   //goods.slice(this.startindex,Math.min(this.startindex+this.blocklenth, goods.length-1))
    //   return res
    // }),tap(()=> this.changeDetector.markForCheck()));
  }

  OnBlockClick(block) {
    this.startindex = block;
    this.UpdateGoodsview();
    //this.orders$ = this.allorders$.pipe(map(goods => goods.slice(this.startindex,this.startindex+ this.blocklenth)))
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
