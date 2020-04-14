import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.sass']
})
export class PortfolioListComponent implements OnChanges {
  @Input() portfolio: any[] = [];
  displayedColumns: string[];

  constructor() { }

  ngOnChanges() {
    console.log(this.portfolio);
    if (this.portfolio && this.portfolio.length > 0) {
      this.displayedColumns = Object.keys(this.portfolio[0]);
    }
  }

}
