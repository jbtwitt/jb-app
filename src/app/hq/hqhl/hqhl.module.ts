import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HqhlRoutingModule } from './hqhl-routing.module';
import { HqhlMainComponent } from './hqhl-main/hqhl-main.component';
import { HqhlListComponent } from './hqhl-list/hqhl-list.component';
import { MatButtonModule, MatTableModule, MatSortModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [HqhlMainComponent, HqhlListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    HqhlRoutingModule
  ]
})
export class HqhlModule { }
