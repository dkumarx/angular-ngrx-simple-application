import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageLayoutComponent } from './layouts/page-layout.component';
import { PageNotFoundComponent } from './components/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then(m => m.CustomerModule)
      },
      { path: '', redirectTo: 'customers/new-customer', pathMatch: 'full' },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
