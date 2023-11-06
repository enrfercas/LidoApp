import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule, MatDateRangePicker} from '@angular/material/datepicker';
import {CalendarService} from "../../../Services/calendar.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {RouterLink} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {Ombrello} from "../../../Models/ombrello";
import {Rango} from "../../../Models/rango";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone:true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule,
    RouterLink,
    BrowserModule
  ],
})
export class CalendarComponent implements OnInit {
  minDate: Date;
  events: string[] = [];
  form: FormGroup;
  public ombreloni: Ombrello[]=[];
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  public lista: boolean= false;
  public savedBookings: any[]=[];
  public disponibili :Ombrello[]=[];







  selected: Date | null = null;
  constructor(public calendar:CalendarService,public fb :FormBuilder) {
    // Fecha de hoy que es la fecha mínima para reservar
    this.minDate = new Date();
    this.form = this.fb.group({
      start: ["", Validators.required],
      end: ["", Validators.required]
    });
    //creamos el Array de todos los puestos
    for(let i= 0; i< 40; i++){
      let ombrello = {
        id: i+ 1,
        bookedDates:[],
        prize: 15- Math.trunc(i/10),
        fila: Math.trunc(i/10) + 1
      }
      // @ts-ignore
      this.ombreloni.push(ombrello);

    }



  }
  ngOnInit() {
    //Recuperamos las reservas realizadas con anterioridad y las añadimos al array que hemos construido
    this.loadBookings();

  }

  loadBookings(){
    let savedBookings: any;
    if (localStorage.getItem("bookings")) {
      savedBookings = JSON.parse(localStorage.getItem("bookings") || '')
    }

    console.log(localStorage.getItem("bookings" || ""));

    this.savedBookings = savedBookings.map((ombrello: any)=>{
      if(ombrello.id === this.ombreloni[ombrello.id-1].id && ombrello.bookedDates){
        //@ts-ignore
        this.ombreloni[ombrello.id-1].bookedDates.push(ombrello.bookedDates);

        console.log("ombreloni con las savedBookings:",this.ombreloni);
      }
    });
  }

  onDateChange(){


  }
  onSubmit(){
    this.lista = true;
    //Llenamos el array de los puestos disponibles, recorriendo todos los elementos y comprobando si las fechas seleccionadas
    // se solapan con alguna de las fechas ya reservadas.


    this.disponibili=this.ombreloni.filter((posto: any)=>{
      this.checkAvailability(posto.bookedDates,this.form.value);
      return posto;
    });

    console.log("form:",this.form.value);
    console.log("disponibili:",this.disponibili);


  }
  makeBooking(ombrello:Ombrello,rangeSelected:{}){
    const startConverted = this.form.value.start;
    const endConverted = this.form.value.end;
    // @ts-ignore
    ombrello.bookedDates.push({start:startConverted,end:endConverted});
    console.log("ombrello",ombrello);
    let savedBookings: any = []
    if (localStorage.getItem("bookings")) {
      savedBookings = JSON.parse(localStorage.getItem("bookings") || '')
    }

    localStorage.setItem("bookings", JSON.stringify([...savedBookings, ombrello]));
    this.loadBookings();
  }
  checkAvailability(bookedDates:[], rangeSelected:{}): boolean{
    let disponibilidad = true;
    const startRange = new Date(this.form.value.start).getTime();
    const endRange = new Date(this.form.value.end).getTime();
    console.log("startRange:",startRange);
    if(bookedDates.length > 0){
      bookedDates.map((rangoBooked:any)=>{
        console.log("rangoBooked.start",rangoBooked[0].start);
        console.log("rangoBooked",rangoBooked[0]);
        const startBooked =(rangoBooked[0].start).getTime();
        console.log(typeof startBooked);
        const endBooked = rangoBooked[0].end.valueOf();
        console.log("startBooked:",startBooked);

        if(((startRange >= startBooked) && (startRange < endBooked)) ||

          ((endRange > startBooked) && (endRange <= endBooked))){

          disponibilidad = false;
        }
      });
    }

    return disponibilidad;
  }

}
