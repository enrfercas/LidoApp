import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Componentes/home/home.component";
import {LoginComponent} from "./Componentes/login/login.component";
import {RegistrationComponent} from "./Componentes/registration/registration.component";
import {CalendarComponent} from "./Componentes/Mare/calendar/calendar.component";
import {SpiaggiaBookingComponent} from "./Componentes/Mare/spiaggia-booking/spiaggia-booking.component";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"calendar",component:SpiaggiaBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
