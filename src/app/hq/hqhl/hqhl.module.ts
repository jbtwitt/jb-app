import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HqhlRoutingModule } from './hqhl-routing.module';
import { HqhlMainComponent } from './hqhl-main/hqhl-main.component';
import { HqhlListComponent } from './hqhl-list/hqhl-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
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
    MatNativeDateModule,
    MatDatepickerModule,
    HqhlRoutingModule
  ]
})
export class HqhlModule { }
