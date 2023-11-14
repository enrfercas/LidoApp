import {Component} from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NavigationComponent} from "../../navigation/navigation.component";
import {AppModule} from "../../../app.module";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent {
  public form : FormGroup;
  public numPerson:number=0;
  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      numPersons:["0"],
      date:[""]
    })
  }

  onSubmit(){

  }
  count(increase:boolean){
    if(increase && this.numPerson < 6){
      this.numPerson += 1;
    }else {
      if(!increase && this.numPerson > 0)
      this.numPerson -= 1;
    }
  }
}
