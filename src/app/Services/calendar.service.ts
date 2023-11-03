import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public ombreloni: any = [];
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  private selected: Date | null = null;


  constructor() {
    for(let i= 0; i< 40; i++){
    let ombrello = {
        bookedDates:[],
        prize: 15- Math.trunc(i/10),
        fila: Math.trunc(i/10) + 1
      }
      this.ombreloni.push(ombrello);
    }

  }
  public setDates(startDate: Date, endDate: Date){
    this.startDate = startDate;
    this.endDate = endDate;
    console.log(this.startDate,this.endDate);
  }
  public getSelected(){
    return this.selected;
  }
  public setSelected(selected:Date){
    this.selected = selected;
  }
  public getDates(){
    return [this.startDate,this.endDate];
  }
  public checkAvaibility(){

  }
  public makeBooking(startDate : Date, endDate: Date, numOmbrello: number){
    this.ombreloni[numOmbrello].bookedDates.push(startDate);
    this.ombreloni[numOmbrello].bookedDates.push(endDate);
    console.log("datesBooked:",this.ombreloni[numOmbrello].datesBooked);

  }
}
