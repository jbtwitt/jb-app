import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HqhistoryRoutingModule } from './hqhistory-routing.module';
import { HqhistoryListComponent } from './hqhistory-list/hqhistory-list.component';
import { MatTableModule, MatSortModule } from '@angular/material';


@NgModule({
  declarations: [
    HqhistoryListComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    HqhistoryRoutingModule,
  ]
})
export class HqhistoryModule { }
