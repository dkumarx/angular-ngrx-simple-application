import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegEx, FormFieldsMessages } from "../../constants/index";

import { Customer } from '../../models/customer';
import { CustomerService } from '../customers.service';
import { GenericValidator } from '../../shared/generic-validator';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit, OnDestroy {
  ffMsgs = FormFieldsMessages
  pageTitle = 'New customer registration';
  errorMessage = '';
  customerForm: FormGroup;

  customer: Customer | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private customerService: CustomerService) {

    this.validationMessages = {
      custFirstName: {
        required: this.ffMsgs.FIRST_NAME.REQUIRED,
        pattern: this.ffMsgs.FIRST_NAME.VALIDATION
      },
      custLastName: {
        required: this.ffMsgs.LAST_NAME.REQUIRED,
        pattern: this.ffMsgs.LAST_NAME.VALIDATION
      },
      custDOB: {
        required: this.ffMsgs.DOB.REQUIRED,
        pattern: this.ffMsgs.DOB.VALIDATION
      },
      custEmail: {
        required: this.ffMsgs.EMIAL.REQUIRED,
        pattern: this.ffMsgs.EMIAL.VALIDATION
      },
      custPhone: {
        required: this.ffMsgs.PHONE.REQUIRED,
        pattern: this.ffMsgs.PHONE.VALIDATION
      },
      custAddress: {
        required: this.ffMsgs.ADDRESS.REQUIRED
      }
    };

   this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.customerForm = this.fb.group({
      custFirstName: ['', [
        Validators.required,
        Validators.pattern(RegEx.CHAR_ONLY)
      ]],
      custLastName: ['',  [
        Validators.required,
        Validators.pattern(RegEx.CHAR_ONLY)
      ]],
      custDOB: ['', [
        Validators.required,
        Validators.pattern(RegEx.DOB)
      ]],
      custEmail: ['', [
          Validators.required,
          Validators.pattern(RegEx.EMAIL)
      ]],
      custPhone: ['', [
        Validators.required,
        Validators.pattern(RegEx.PHONE)
      ]],
      custAddress: ['', Validators.required]
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
