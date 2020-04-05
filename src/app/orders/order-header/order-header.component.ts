import { IOrder } from './../../models/order';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { OrdersDatasourseService } from '../orders.datasourse.service';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent implements OnInit {

  @Input('order') 
  order :IOrder

  constructor(private db : OrdersDatasourseService,
              private tservice: TelegramService ) { }

  ngOnInit() {
  }

  OnFilialSelected(value:string) {
    if (value=='cansel') {
      return;
    }
    this.db.SetOrderChiled(this.order.id,"filial",value).then(()=>
    {
      this.order.comment= `Перенаправлено из ${this.db.filialname}`
      this.order.filial = value;
      
      this.tservice.SendMessage(this.db.filial,this.db.GetTformatedMessage(this.order));
    })
  }

  TakeInWork() {
    xForm1C.TakeOrderInWork(JSON.stringify(this.order));
  }
  
  
}
