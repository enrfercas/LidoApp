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


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SpiaggiaBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    CalendarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
