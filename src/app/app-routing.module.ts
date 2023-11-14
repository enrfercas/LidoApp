import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Componentes/home/home.component";
import {LoginComponent} from "./Componentes/login/login.component";
import {RegistrationComponent} from "./Componentes/registration/registration.component";
import {SpiaggiaBookingComponent} from "./Componentes/Mare/spiaggia-booking/spiaggia-booking.component";
import {RestaurantComponent} from "./Componentes/restaurantBooking/restaurant/restaurant.component";


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"calendar",component:SpiaggiaBookingComponent},
  {path:"restaurant",component:RestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
