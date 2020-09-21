import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
