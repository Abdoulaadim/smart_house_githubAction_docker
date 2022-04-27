import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import  {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { HouseComponent } from './component/house/house.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PageNoutFoundComponent } from './component/page-nout-found/page-nout-found.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { FlashMessagesModule } from 'flash-messages-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HouseComponent,
    NavbarComponent,
    PageNoutFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    SweetAlert2Module.forRoot(),
    SweetAlert2Module

  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
