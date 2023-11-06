import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  public formGroup: FormGroup;


  constructor(public formBuilder: FormBuilder, public router: Router) {
    this.formGroup = this.formBuilder.group({
      id: [""],
      registerName: ["", [Validators.required, Validators.minLength(4)]],
      registerUsername: ["", [Validators.required, Validators.minLength(4)]],
      registerEmail: ["", [Validators.required, Validators.email]],
      registerPassword: ["", [Validators.required, Validators.minLength(4)]],
      registerRepeatPassword: ["", [Validators.required]]
    });

  }

  onSubmit() {
    if (this.formGroup.value.registerPassword == this.formGroup.value.registerRepeatPassword) {
      let nuevoUser = this.formGroup.value;
      nuevoUser.id = 0
      //Controllo che ci siano utenti registrati
      //@ts-ignore
      let savedUsers: string[] = JSON.parse(localStorage.getItem(("user") || '{}'));
      console.log(savedUsers);

      //Se ci sono utenti
      if (savedUsers) {

        const findUser: any = savedUsers.find((item:any) => item.registerName === nuevoUser.registerName);
        if (findUser) {
          alert("Già essiste questo utente");
        } else {
          nuevoUser.id = nuevoUser.id + savedUsers.length;
          localStorage.setItem("user", JSON.stringify([nuevoUser]));
          this.router.navigate(["login"]);
        }
        //Se non ci sono utenti
      } else {
        nuevoUser.id = 1;
        localStorage.setItem("user", JSON.stringify([nuevoUser]));
        this.router.navigate(["login"]);
      }

    } else {
      alert("I password non coincidono");
    }
  }

}
