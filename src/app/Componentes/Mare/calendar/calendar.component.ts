import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule, MatDateRangePicker} from '@angular/material/datepicker';
import {CalendarService} from "../../../Services/calendar.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {NgIf, JsonPipe, NgFor, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {Ombrello} from "../../../Models/ombrello";
import {Rango} from "../../../Models/rango";
import Swal from 'sweetalert2';
import {ViewChild, ElementRef} from '@angular/core';




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
    BrowserModule,
    NgOptimizedImage
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
  public prenotato: Ombrello ={
    id:0,
    bookedDates:[],
    prize:0,
    fila:0,
    totalPrize:0,
    backGroundColor:"",
    image:""
  };








  selected: Date | null = null;
  constructor(public calendar:CalendarService,public fb :FormBuilder,public router:Router) {
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
        fila: Math.trunc(i/10) + 1,
        backGroundColor:'#f00',
        image:"../assets/photos/iconoRosso.png"
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
      if(this.checkAvailability(posto.bookedDates,this.form.value)){
        const startRange = new Date(this.form.value.start).getDate();
        const endRange = new Date(this.form.value.end).getDate();
        let selectedDatesRange = endRange - startRange;
        posto.totalPrize= selectedDatesRange*posto.prize;

        return posto;
      }


    });
    this.ombreloni.map((posto:any)=>{
      if(this.checkAvailability(posto.bookedDates,this.form.value)){
        posto.backGroundColor = '#08ff00';
        posto.image = "../assets/photos/iconoVerde.png"
      }

    });

    console.log("form:",this.form.value);
    console.log("disponibili:",this.disponibili);



  }
  makeBooking(ombrello:Ombrello,rangeSelected:{}){
    const startConverted = this.form.value.start;
    const endConverted = this.form.value.end;
    if(ombrello.backGroundColor == '#08ff00'){
      Swal.fire({
        title: "Sei sicuro?",
        text: "Non potrà tornare indietro!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,prenota!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Fatto!",
            text: "Il tuo ombrellone è stato prenotato",
            icon: "success"
          });

          ombrello.bookedDates.push({start:startConverted,end:endConverted});
          console.log("ombrello",ombrello);
          let savedBookings: any = []
          if (localStorage.getItem("bookings")) {
            savedBookings = JSON.parse(localStorage.getItem("bookings") || '')
          }

          localStorage.setItem("bookings", JSON.stringify([...savedBookings, ombrello]));
          this.loadBookings();
          this.prenotato = ombrello;
          this.apriModale();
          this.router.navigate(['/calendar']);
        }
      });

    }

  }
  checkAvailability(bookedDates:[], rangeSelected:{}): boolean{
    let disponibilidad = true;
    const startRange = new Date(this.form.value.start).getDate();
    console.log(typeof startRange);
    const endRange = new Date(this.form.value.end).getDate();
    console.log("startRange:",startRange);
    if(bookedDates.length > 0){
      bookedDates.map((rangoBooked:any)=>{
        console.log("rangoBooked.start",rangoBooked[0].start);
        console.log("rangoBooked",rangoBooked[0]);
        const startBooked =new Date(rangoBooked[0].start).getDate();
        console.log(typeof startBooked);
        const endBooked = new Date(rangoBooked[0].end).getDate();
        console.log("startBooked:",startBooked);

        if(((startRange >= startBooked) && (startRange <= endBooked)) ||

          ((endRange >= startBooked) && (endRange <= endBooked))||((startRange <= startBooked) && (endRange >= endBooked))){

          disponibilidad = false;
        }
      });
    }
    console.log("disponibilidad",disponibilidad);

    return disponibilidad;
  }
  public apriModale(){

    const modale:any = document.getElementById('modale');
    modale.classList.add('modaleaperta');
  }
  public chiudiModale(){
    const modale:any = document.getElementById('modale');
    modale.classList.remove('modaleaperta');
  }

}
