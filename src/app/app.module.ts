import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Componentes/navigation/navigation.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistrationComponent } from './Componentes/registration/registration.component';
import { CalendarComponent } from './Componentes/Mare/calendar/calendar.component';
import { HomeComponent } from './Componentes/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpiaggiaBookingComponent } from './Componentes/Mare/spiaggia-booking/spiaggia-booking.component';
import { RestaurantComponent } from './Componentes/restaurantBooking/restaurant/restaurant.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SpiaggiaBookingComponent,
    RestaurantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    BrowserAnimationsModule,
    CalendarComponent,

    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,

  ],
  providers: [],
  exports: [
    NavigationComponent,
    NavigationComponent,
    NavigationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
