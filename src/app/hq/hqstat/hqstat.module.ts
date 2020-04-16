import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HqstatRoutingModule } from './hqstat-routing.module';
import { HqstatMainComponent } from './hqstat-main/hqstat-main.component';
import { HqstatListComponent } from './hqstat-list/hqstat-list.component';
import { MatTableModule, MatSortModule, MatTabsModule } from '@angular/material';
import { HqhistoryListComponent } from './hqhistory-list/hqhistory-list.component';

@NgModule({
  declarations: [HqstatMainComponent, HqstatListComponent, HqhistoryListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    HqstatRoutingModule
  ]
})
export class HqstatModule { }
