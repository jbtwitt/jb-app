import { Component, OnInit, Input } from '@angular/core';
import { alternateTempoCollection } from '../../data/alternate-tempo-collection';
import { AlternateTempoCollectionService } from '../services/alternate-tempo-collection.service';

@Component({
  selector: 'app-alternate-tempo-collection-form',
  templateUrl: './alternate-tempo-collection-form.component.html',
  styleUrls: ['./alternate-tempo-collection-form.component.sass']
})
export class AlternateTempoCollectionFormComponent implements OnInit {
  @Input() atCollection = alternateTempoCollection;

  constructor(public atCollectionService: AlternateTempoCollectionService) { }

  ngOnInit() {
  }

}
