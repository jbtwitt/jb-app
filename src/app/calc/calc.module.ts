import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalcRoutingModule } from './calc-routing.module';
import { CalcMainComponent } from './calc-main/calc-main.component';
import { BankRateFormComponent } from './bank-rate-form/bank-rate-form.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [CalcMainComponent, BankRateFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    CalcRoutingModule
  ]
})
export class CalcModule { }
