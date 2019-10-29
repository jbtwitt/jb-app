import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { RaspberryPiRoutingModule } from './raspberry-pi-routing.module';
import { MatCardModule, MatInputModule } from '@angular/material';
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
