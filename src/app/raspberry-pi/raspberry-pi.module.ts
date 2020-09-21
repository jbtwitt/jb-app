import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { RaspberryPiRoutingModule } from './raspberry-pi-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MonitorComponent,],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,

    RaspberryPiRoutingModule
  ]
})
export class RaspberryPiModule { }
