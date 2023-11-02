import { Component } from '@angular/core';
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public isLogged:boolean;
  constructor(public auth:AuthService) {
    this.isLogged = this.auth.getIsLogged();
  }
}
