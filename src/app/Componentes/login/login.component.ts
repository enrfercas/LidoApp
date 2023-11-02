import {Component} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../Auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formGroup: FormGroup;
  public isLogged: boolean = false;
  private usersArray: any;

  constructor(public fb: FormBuilder, public router: Router, public auth: AuthService) {
    //Formulario de Login
    this.formGroup = this.fb.group({
      loginName: ["", Validators.required],
      loginPassword: ["", Validators.required]
    });
    //Recuperamos los usuarios registrados
    // @ts-ignore
    this.usersArray = JSON.parse(localStorage.getItem("user" || "{}"));

  }

  onSubmit() {
    if (this.usersArray.some((user: any) => user.registerUsername === this.formGroup.value.loginName && user.registerPassword === this.formGroup.value.loginPassword)) {
      this.isLogged = true;

      /*this.router.navigate(
        ['/home'],
        {
          queryParams: { isLogged: 'true' },
          queryParamsHandling:'merge'
        }
      );
    }*/
      this.auth.setIsLogged(this.isLogged);
      this.router.navigate(['/home']);
    }
  }
}
