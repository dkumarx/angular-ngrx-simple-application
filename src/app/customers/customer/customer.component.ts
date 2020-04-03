import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Customer } from '../../models/customer';
import { CustomerService } from '../customers.service';

/* NgRx */
import { Store } from '@ngrx/store';


@Component({
  selector: 'customer-list',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  pageTitle = 'Customers';
  errorMessage: string;

  displayCode: boolean;

  customers: Customer[];

  // Used to highlight the selected Customer in the list
  selectedCustomer: Customer | null;
  sub: Subscription;

  constructor(private store: Store<any>,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.sub = this.customerService.selectedCustomer$.subscribe(
      selectedCustomer => this.selectedCustomer = selectedCustomer
    );

    this.customerService.getAllCustomers().subscribe({
      next: (customers: Customer[]) => this.customers = customers,
      error: err => this.errorMessage = err.error
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  customerSelected(customer: Customer): void {
    this.customerService.showSelectedCustomer(customer);
  }

}
