import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HqscanRoutingModule } from './hqscan-routing.module';
import { HqscanMainComponent } from './hqscan-main/hqscan-main.component';
import { HqscanListComponent } from './hqscan-list/hqscan-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [HqscanMainComponent, HqscanListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    HqscanRoutingModule
  ]
})
export class HqscanModule { }
