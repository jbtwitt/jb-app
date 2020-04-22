import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-group-portfolio-list',
  templateUrl: './group-portfolio-list.component.html',
  styleUrls: ['./group-portfolio-list.component.sass']
})
export class GroupPortfolioListComponent implements OnInit, OnChanges {
  @Input() portfolio: any[] = [];
  @Input() groupBy: string = 'ticker';
  groupPortfolio: any[];
  selectedGroup: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.portfolio && this.portfolio.length > 0) {
      this.groupPortfolio = this.createGroupBy(this.portfolio, this.groupBy);
    }
  }

  groupSelected(group) {
    this.selectedGroup = group;
  }

  get groupList() {
    return this.portfolio.filter(p => p[this.groupBy] === this.selectedGroup);
  }

  createGroupBy(data, by) {
    // let copy = Object.assign({}, data); // assign doesn't do deep cloning
    const copy = JSON.parse(JSON.stringify(data));
    const reduceList = copy.reduce((acc, row) => {
      const key = acc[row[by]];
      if (key) {
        key.shares += row.shares;
        key.buyCost += row.buyCost;
        key.buyPrice = key.buyCost / key.shares;
        key.soldIncome += row.soldIncome;
        key.soldPrice = key.soldIncome / key.shares;
        key.buyDate = '';
      } else {
        acc[row[by]] = row;
        // delete row.ticker;
        delete row[by];
      }
      return acc;
    }, {});
    // console.log(reduceList)
    const result = [];
    Object.keys(reduceList).forEach(key => {
      reduceList[key] = { ...reduceList[key] };
      const row = reduceList[key];
      row.ticker = (row.buyDate === '') ? "" : row.ticker;
      row[by] = key;
      result.push(row);
    })
    // console.log(result)
    return result;
  }
}
