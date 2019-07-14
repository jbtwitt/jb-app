import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatInputModule, MatCardModule, MatExpansionModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BasicAlternateTempoComponent } from './basic-alternate-tempo/basic-alternate-tempo.component';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { AlternateTempoFormComponent } from './alternate-tempo-form/alternate-tempo-form.component';
import { AlternateTempoCollectionFormComponent } from './alternate-tempo-collection-form/alternate-tempo-collection-form.component';

@NgModule({
  declarations: [BasicAlternateTempoComponent, AlternateTempoFormComponent, AlternateTempoCollectionFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ExerciseRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
  ],
  exports: [
  ]
})
export class ExerciseModule { }
