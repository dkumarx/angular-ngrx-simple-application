import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CustomerData } from './api/customer-data';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageLayoutComponent } from './layouts/page-layout.component';
import { MainMenuComponent } from './components/header/main-menu/main-menu.component';

import { PageNotFoundComponent } from './components/page-not-found.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(CustomerData),
    AppRoutingModule,
    StoreModule.forRoot({})
  ],
  declarations: [
    AppComponent,
    PageLayoutComponent,
    MainMenuComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
