import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
    {
      path: '', component: AccountComponent,
      children: [
        { path: 'registration', component: RegistrationComponent },
        { path: 'login', component: LoginComponent }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }