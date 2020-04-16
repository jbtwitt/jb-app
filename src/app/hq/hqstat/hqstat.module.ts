import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HqstatRoutingModule } from './hqstat-routing.module';
import { HqstatMainComponent } from './hqstat-main/hqstat-main.component';
import { HqstatListComponent } from './hqstat-list/hqstat-list.component';
import { MatTableModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [HqstatMainComponent, HqstatListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    HqstatRoutingModule
  ]
})
export class HqstatModule { }
