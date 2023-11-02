import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../Auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public isLogged: boolean;

  constructor(public route: ActivatedRoute,public auth:AuthService,public router:Router) {

    this.route.queryParams
       .subscribe((params) => {
         this.isLogged = params['isLogged'];
      });
    this.isLogged = this.auth.getIsLogged();
  }
  public logOut(){
    this.auth.setIsLogged(false);
    this.router.navigate(['/login']);
  }
}
