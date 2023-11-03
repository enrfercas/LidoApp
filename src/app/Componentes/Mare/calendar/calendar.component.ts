import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule, MatDateRangePicker} from '@angular/material/datepicker';
import {CalendarService} from "../../../Services/calendar.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';

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
    MatNativeDateModule
  ],
})
export class CalendarComponent implements OnInit {
  minDate: Date;
  events: string[] = [];
  form: FormGroup;
  public ombreloni: any = [];
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  public lista: boolean= false;
  public savedBookings: any = null;





  @Output()onChange: EventEmitter<any> = new EventEmitter();

  selected: Date | null = null;
  constructor(public calendar:CalendarService,public fb :FormBuilder) {
    this.minDate = new Date();
    this.form = this.fb.group({
      start: ["", Validators.required],
      end: ["", Validators.required]
    });
    for(let i= 0; i< 40; i++){
      let ombrello = {
        id: i+ 1,
        bookedDates:[],
        prize: 15- Math.trunc(i/10),
        fila: Math.trunc(i/10) + 1
      }
      this.ombreloni.push(ombrello);
    }

  }
  ngOnInit() {

  }

  onDateChange(){

    console.log('ciao', this.selected)
    this.onChange.emit({date: this.selected})
  }
  onSubmit(){
    console.log(this.form.value);
    this.lista = true;
    // @ts-ignore
    this.savedBookings = JSON.parse(localStorage.getItem("bookings" || "{}"));
  }
  makeBooking(start: Date, end: Date, id:number){
    this.ombreloni[id].bookedDates.push([start,end]);

  }
}
