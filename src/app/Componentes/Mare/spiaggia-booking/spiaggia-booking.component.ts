import { Component } from '@angular/core';
import {CalendarService} from "../../../Services/calendar.service";

@Component({
  selector: 'app-spiaggia-booking',
  templateUrl: './spiaggia-booking.component.html',
  styleUrls: ['./spiaggia-booking.component.css']
})
export class SpiaggiaBookingComponent {
  constructor(public calendar:CalendarService) {

  }
  public setStartData(){
    this.calendar.getSelected();

  }
  public dateFromSelected(event: any){
    console.log(event.date)
  }

}
