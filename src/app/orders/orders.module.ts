import { MaterialsModule } from './../materials/materials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderHeaderComponent } from './order-header/order-header.component';
import { StoreModule } from '@ngrx/store';
import * as fromOrders from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './order.effects';
import { OrdersDatasourseService } from './orders.datasourse.service';



@NgModule({
  declarations: [OrderListComponent, OrderHeaderComponent],
  exports:[OrderListComponent],
  providers:[OrdersDatasourseService],
  imports: [
    CommonModule,
    MaterialsModule,
    EffectsModule.forFeature([OrderEffects]),
    StoreModule.forFeature(fromOrders.ordersFeatureKey, fromOrders.orderreducer, { metaReducers: fromOrders.metaReducers })

  ]
})
export class OrdersModule { }
