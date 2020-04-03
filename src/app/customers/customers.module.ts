import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/customer.reducer';
import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerNewComponent } from '../customers/customer-new/customer-new.component';

const customerRoutes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'new-customer', component: CustomerNewComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(customerRoutes),
    StoreModule.forFeature('customers', reducer),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
    
  ],
  declarations: [
    CustomersComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    CustomerNewComponent
  ]
})
export class CustomerModule { }
