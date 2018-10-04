import { Component, OnInit, ViewChild } from '@angular/core';
import { Action } from './model/action';
import { CurrencyCode } from './model/currency.codes';
import { Sort } from './model/sort';
import { DataService } from "./services/data.service";
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableComponent }    from './components/table/table.component';
import { AppConstants } from "./app.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild("actionDropDown") actionsChild: DropdownComponent;
  @ViewChild('currencyDropDown') currenciesChild: DropdownComponent;
  @ViewChild('sortByDateDropDown') sortByDateChild: DropdownComponent;
  @ViewChild('transactionsTable') transactionsTable: TableComponent;  
  
  title = 'Front End recruitment challenge';
  filter = "";

  constructor(private data: DataService) { }
  
  actions: Action[] = [
    {value: '', viewValue: AppConstants.DEFAULT_COMBO_VALUE},
    {value: 'payment', viewValue: 'Payment'},
    {value: 'credit', viewValue: 'Credit'}
  ];

  currenyCodes: CurrencyCode[] = [
    {value: '', viewValue: AppConstants.DEFAULT_COMBO_VALUE},
    {value: 'EUR', viewValue: 'Euros'},
    {value: 'JPY', viewValue: 'Yenes'},
    {value: 'USD', viewValue: 'US dollars'}
  ];

  sortByDate: Sort[] = [
    {value: '', viewValue: AppConstants.DEFAULT_COMBO_VALUE},
    {value: 'date', viewValue: 'Order ascending'},
    {value: '-date', viewValue: 'Order descending'}
  ];

  onSelected(itemSelected) {
    this.filter = itemSelected;
  }

  onClick() {
    let filter = "";

    if (this.actionsChild.select) {
      filter = "action=" + this.actionsChild.select;
    }
    if (this.currenciesChild.select) {
      if (filter) {
        filter += "&";
      }
      filter += "currencyCode=" + this.currenciesChild.select;
    }
    if (this.sortByDateChild.select) {
      if (filter) {
        filter += "&";
      }
      filter += "orderBy=" + this.sortByDateChild.select;
    }

    this.transactionsTable.getTransactions(filter);
  }
  
}
