import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { TransactionsService } from './transactions.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'dru-table',
  templateUrl: './table.component.html',
  providers: [ TransactionsService ],
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableComponent implements OnInit {

  displayedColumns: string[] = ['holderName', 'brandId', 'lastFourDigits', 'action', 'amount', 'currencyCode'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.getTransactions("");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTransactions(queryParam): void {
    this.transactionsService.getTransactions(queryParam).subscribe(transactions => {
          this.dataSource.data = transactions;
    });
  } 
  
}
