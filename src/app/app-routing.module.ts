import { OrdersExchangeComponent } from './exchange/orders-exchange/orders-exchange.component';
import { GoodsExchangeComponent } from './exchange/goods-exchange/goods-exchange.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsResolver } from './exchange/resolvers/goods.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'goods',
    component: GoodsExchangeComponent,
    resolve:GoodsResolver
  },

  {
    path: 'orders',
    component: OrdersExchangeComponent
  },
  
  { path: '**', 
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
