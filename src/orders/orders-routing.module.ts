import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent, OrderItemComponent } from '.';

const routes: Routes = [
  {
    path: 'orders',
    // TODO: lazy load - replace path to ''
    // path: '',
    component: OrderListComponent,
  },
];

export const ordersRoutingComponents = [OrderListComponent, OrderItemComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}