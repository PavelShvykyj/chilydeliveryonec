import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsExchangeComponent } from './goods-exchange/goods-exchange.component';
import { OrdersExchangeComponent } from './orders-exchange/orders-exchange.component';
import { GoodsResolver } from './resolvers/goods.resolver';
import { OnecModule } from '../onec/onec.module';

@NgModule({
  declarations: [GoodsExchangeComponent, OrdersExchangeComponent],
  imports: [
    CommonModule,
    OnecModule
  ],
  providers:[GoodsResolver]
})
export class ExchangeModule { }
