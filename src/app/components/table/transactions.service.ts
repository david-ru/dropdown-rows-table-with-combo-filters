import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Transaction } from '../../model/transaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('user:password')
  })
};

@Injectable()
export class TransactionsService {
  transactionsUrl = 'https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions?';
 
  constructor(private http: HttpClient) {
  }
 
  getTransactions (queryParam): Observable<any> {
    let composedUrl = this.transactionsUrl;
    if (queryParam) {
      composedUrl += queryParam;
    }
    //To show that the URL is made correctly
    console.log("Resulting URL==> " + composedUrl);

    //return this.http.get<Transaction[]>(composedUrl, httpOptions)
    return this.http.get("src/app/data/transactions.json");
  }
 
}
