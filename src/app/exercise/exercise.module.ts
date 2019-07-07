import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatInputModule, MatCardModule } from '@angular/material';
import { CounterAssistantComponent } from './counter-assistant/counter-assistant.component';
import { FormsModule } from '@angular/forms';
import { BasicAlternateTempoComponent } from './basic-alternate-tempo/basic-alternate-tempo.component';
import { ExerciseRoutingModule } from './exercise-routing.module';

@NgModule({
  declarations: [CounterAssistantComponent, BasicAlternateTempoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ExerciseRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
  ],
  exports: [
    CounterAssistantComponent,
    BasicAlternateTempoComponent,
  ]
})
export class ExerciseModule { }
