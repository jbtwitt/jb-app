import { Component, OnInit, Input } from '@angular/core';
import { AlternateTempo } from '../../models/alternate-tempo.model';

@Component({
  selector: 'app-alternate-tempo-form',
  templateUrl: './alternate-tempo-form.component.html',
  styleUrls: ['./alternate-tempo-form.component.sass']
})
export class AlternateTempoFormComponent implements OnInit {
  @Input() alternateTempo: AlternateTempo = new AlternateTempo();

  constructor() { }

  ngOnInit() {
  }

}