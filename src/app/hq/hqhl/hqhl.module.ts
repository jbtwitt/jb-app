import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HqhlRoutingModule } from './hqhl-routing.module';
import { HqhlMainComponent } from './hqhl-main/hqhl-main.component';
import { HqhlListComponent } from './hqhl-list/hqhl-list.component';
import { MatButtonModule, MatTableModule, MatSortModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HqhlMainComponent, HqhlListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    HqhlRoutingModule
  ]
})
export class HqhlModule { }
