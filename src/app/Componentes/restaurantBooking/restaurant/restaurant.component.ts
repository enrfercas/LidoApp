import {Component, OnInit} from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NavigationComponent} from "../../navigation/navigation.component";
import {AppModule} from "../../../app.module";
import {Tavolo} from "../../../Models/tavolo";
import {MatIconModule} from '@angular/material/icon';
import Swal from 'sweetalert2';
import {Ombrello} from "../../../Models/ombrello";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  public form: FormGroup;
  public numPersons: number;
  public minDate: Date;
  public tavoli: Tavolo[] = [];
  public savedBookings: Tavolo[] = [];
  public prenotato: Tavolo = {numPerson: 0, date: []}

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      numPerson: [0],
      date: [""]
    })
    this.minDate = new Date();
    this.numPersons = 0;

  }

  ngOnInit() {
    this.loadBookings();
  }

  onSubmit() {
    let booking: Tavolo = {numPerson:this.form.value.numPerson,date:[]};
    booking.numPerson = this.numPersons;
    console.log("booking:", booking);
    this.makeBooking(booking,this.form.value.date);
  }

  count(increase: boolean) {
    if (increase && this.numPersons < 20) {
      this.numPersons += 1;
    } else {
      if (!increase && this.numPersons > 0)
        this.numPersons -= 1;
    }
  }

  loadBookings() {
    let savedBookings: any;
    if (localStorage.getItem("restaurantBookings")) {
      savedBookings = JSON.parse(localStorage.getItem("restaurantBookings") || '')
    }

    console.log(localStorage.getItem("restaurantBookings" || ""));

    this.savedBookings = savedBookings;
  }

  makeBooking(tavolo: Tavolo, date: string) {

    Swal.fire({
      title: "Richiesta di prenotazione",
      text: "Arrivarà una risposta a la sua e-mail",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,prenota!"
    }).then((result) => {
      if (result.isConfirmed) {
        tavolo.date.push(date);
        console.log("tavolo", tavolo);
        let savedBookings: any = []
        if (localStorage.getItem("restaurantBookings")) {
          savedBookings = JSON.parse(localStorage.getItem("restaurantBookings") || '')
        }

        localStorage.setItem("restaurantBookings", JSON.stringify([...savedBookings, tavolo]));
        this.loadBookings();
        this.prenotato = tavolo;
      }
    });
  }
}
