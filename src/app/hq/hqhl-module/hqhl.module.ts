import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HqhlRoutingModule } from './hqhl-routing.module';
import { HqhlMainComponent } from './hqhl-main/hqhl-main.component';
import { HqPercentListComponent } from './components/hq-percent-list/hq-percent-list.component';
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
import { HqPlayMainComponent } from './hq-play-main/hq-play-main.component';
import { TickerListComponent } from './components/ticker-list/ticker-list.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [HqhlMainComponent, HqhlListComponent, HqPercentListComponent, HqPlayMainComponent, TickerListComponent],
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
    MatTabsModule,
    HqhlRoutingModule
  ]
})
export class HqhlModule { }
