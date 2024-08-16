import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountComponent } from '../account/account.component';
import { LoginComponent } from '../account/login/login.component';
import { RegistrationComponent } from '../account/registration/registration.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from '../services/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from '../auth/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    HttpClientModule
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    RegistrationComponent
  ],
  exports: [AccountComponent],
  providers: [AccountService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }]
})
export class AccountModule { }
