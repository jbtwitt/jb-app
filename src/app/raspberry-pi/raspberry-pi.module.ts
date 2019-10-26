import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { RaspberryPiRoutingModule } from './raspberry-pi-routing.module';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [MonitorComponent,],
  imports: [
    CommonModule,
    MatCardModule,

    RaspberryPiRoutingModule
  ]
})
export class RaspberryPiModule { }
