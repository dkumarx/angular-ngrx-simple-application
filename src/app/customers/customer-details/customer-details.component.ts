import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Customer } from '../../models/customer';
import { CustomerService } from '../customers.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  pageTitle = 'Customer details';
  customer: Customer | null;
  sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.sub = this.customerService.selectedCustomer$.subscribe(
      selectedCustomer => this.displayCustomer(selectedCustomer)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  displayCustomer(customer: Customer | null): void {
    this.customer = customer;
  }

}
