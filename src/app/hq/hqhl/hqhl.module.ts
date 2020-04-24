import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HqhlRoutingModule } from './hqhl-routing.module';
import { HqhlMainComponent } from './hqhl-main/hqhl-main.component';
import { HqhlListComponent } from './hqhl-list/hqhl-list.component';

@NgModule({
  declarations: [HqhlMainComponent, HqhlListComponent],
  imports: [
    CommonModule,
    HqhlRoutingModule
  ]
})
export class HqhlModule { }
