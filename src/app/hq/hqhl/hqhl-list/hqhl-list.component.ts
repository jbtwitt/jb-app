import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-hqhl-list',
  templateUrl: './hqhl-list.component.html',
  styleUrls: ['./hqhl-list.component.css']
})
export class HqhlListComponent implements OnInit, OnChanges {
  @Input() hqhl: any[];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    "ticker", //"ndaysHL",
    "date", "close", "cChange", "vChange",
    "lcPos", "lcDate", "lcChange", "lClose",
    "hClose", "hcChange", "hcDate", "hcPos",
    "lvPos", "lvDate", //"lVolume",
    "hvPos", "hvDate", //"hVolume",
  ];
  filterValue: string;

  constructor(
    public uiService: UiService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.hqhl && this.hqhl.length > 0) {
      // console.log(this.hqhl)
      this.hqhl = this.uiService.orderBy(this.hqhl, 'lvPos');
      this.dataSource = new MatTableDataSource(this.hqhl);
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filter(this.filterValue);
  }
  filter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    this.filterValue = value;
  }
}
