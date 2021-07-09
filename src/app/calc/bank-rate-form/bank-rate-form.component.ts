import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-rate-form',
  templateUrl: './bank-rate-form.component.html',
  styleUrls: ['./bank-rate-form.component.css']
})
export class BankRateFormComponent implements OnInit {
  bankRate: any;

  constructor() { }

  ngOnInit(): void {
    this.bankRate = {
      principle: 1000,
      rate: 2,
      nPeriods: 36,
      end: 2040,
      target: 2000,
    };
  }
  calc() {
    this.bankRate.end = this.bankRate.principle;
    for (let i=0; i<this.bankRate.nPeriods; i++) {
      this.bankRate.end += this.bankRate.end * this.bankRate.rate / 100;
    }
  }
  calcTarget() {
    this.bankRate.nPeriods = 1;
    this.bankRate.end = this.bankRate.principle;
    for (let i=0; i<this.bankRate.nPeriods; i++) {
      this.bankRate.end += this.bankRate.end * this.bankRate.rate / 100;
      if (this.bankRate.end > this.bankRate.target) {
        break;
      } else {
        this.bankRate.nPeriods ++;
      }
    }
  }
}
