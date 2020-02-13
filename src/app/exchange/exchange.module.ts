import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsExchangeComponent } from './goods-exchange/goods-exchange.component';
import { OrdersExchangeComponent } from './orders-exchange/orders-exchange.component';
import { GoodsResolver } from './resolvers/goods.resolver';

@NgModule({
  declarations: [GoodsExchangeComponent, OrdersExchangeComponent],
  imports: [
    CommonModule
  ],
  providers:[GoodsResolver]
})
export class ExchangeModule { }
