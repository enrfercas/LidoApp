import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: boolean = false;

  constructor() {}

  public getIsLogged():boolean{
    return this.isLogged;
    console.log("1ºisLogged del servicio:",this.isLogged);
  }
  public setIsLogged(isLogged:boolean){
    this.isLogged = isLogged;
    console.log("2ºisLogged del servicio:",this.isLogged);
  }
}
