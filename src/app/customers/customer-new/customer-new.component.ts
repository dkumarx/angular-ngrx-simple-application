import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Customer } from '../../models/customer';
import { CustomerService } from '../customers.service';
import { GenericValidator } from '../../shared/generic-validator';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit, OnDestroy {
  pageTitle = 'New customer registration';
  errorMessage = '';
  customerForm: FormGroup;

  customer: Customer | null;
  sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private customerService: CustomerService) {

    this.validationMessages = {
      custFirstName: {
        required: 'First Name is required.'
      },
      custDOB: {
        required: 'DOB is required.',
        pattern: 'Please enter valid DOB (yyyy/MM/ddd)'
      },
      custEmail: {
        required: 'Email is required.',
        pattern: 'Please enter valid email address.'
      }
    };

   this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.customerForm = this.fb.group({
      custFirstName: ['', [Validators.required]],
      custLastName: [''],
      custDOB: ['', 
        [
          Validators.required,
          Validators.pattern('([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))')
        ]
      ],
      custEmail: ['',
        [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]
      ],
      custPhone: [''],
      custAddress: ['']
    });


    // Watch for form field value changes
    this.customerForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.customerForm)
    );
  }

  ngOnDestroy(): void {
  }

  //Help ful if the user tabs through required fields
   blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.customerForm);
   }

  cancelEdit(): void {
    // Reset form values
    this.customerForm.reset();
  }

   saveCustomer(): void {
    console.log(" Previous DATA ", this.customer)
    if (this.customerForm.valid) {
      if (this.customerForm.dirty) {
        const p = { ...this.customerForm.value };
        console.log(" Save DATA ", p)
        this.customerService.registerNewCustomer(p).subscribe({
          error: err => this.errorMessage = err.error
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
   }

}
