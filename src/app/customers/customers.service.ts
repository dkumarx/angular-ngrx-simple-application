import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerUrl = 'api/customers';
  private customers: Customer[];

  private selectedCustomerSource = new BehaviorSubject<Customer | null>(null);
  selectedCustomer$ = this.selectedCustomerSource.asObservable();

  constructor(private http: HttpClient) { }

  showSelectedCustomer(selectedCustomer: Customer | null): void {
    this.selectedCustomerSource.next(selectedCustomer);
  }

  getAllCustomers(): Observable<Customer[]> {
    console.log("-- Fetch All Customer --", this.customers)
    if (this.customers) {
      return of(this.customers);
    }
    return this.http.get<Customer[]>(this.customerUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.customers = data),
        catchError(this.handleError)
      );
  }

  // Register new customer details
  registerNewCustomer(customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    customer.id = null; 
    return this.http.post<Customer>(this.customerUrl, customer, { headers })
      .pipe(
        tap(data => console.log('-- Register New Customer [payload] -- ' + JSON.stringify(data))),
        tap(data => {
          this.customers.push(data);
        }),
        catchError(this.handleError)
      );
  }

  // Error handling scenarios
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // This is capture client-side or network error occurred. 
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // API returned an unsuccessful response code.
      errorMessage = `Backend returned ERR CODE ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
