//los lectores
import { randomUUID as uid } from "node:crypto";

interface iAddress {
    street: string;
    number: number;
    apartment: string;
  }
 export class User {
    private id: string = uid();
    private name: string;
    private address: iAddress;
    private phoneNumber: string;
   scoring: number = 0;
    private isPenalized: boolean = false;
    public constructor(name: string, address: iAddress, phoneNumber: string) {
      this.name = name;
      this.address = address;
      this.phoneNumber = phoneNumber;
    }
  
    public getId(): string {
      return this.id;
    }
    public setName(name: string): void {
      this.name = name;
    }
    public getName(): string {
      return this.name;
    }
    public setAddress(address: iAddress): void {
      this.address = address;
    }
    public getAddress(): iAddress {
      return this.address;
    }
    public setPhoneNumber(phoneNumber: string): void {
      this.phoneNumber = phoneNumber;
    }
   
    public getPhoneNumber(): string {
      return this.phoneNumber;
    }
  
    public getScoring(): number {
      return this.scoring;
    }
    public increaseScoring(points: number){
   this.scoring += points;
      console.log(this.scoring)
    }
  
    public decreaseScoring(points: number): void {
      if(this.scoring > 0){
      this.scoring -= points;
            console.log(this.scoring)
  } else{
    console.log("no puede decrecer su puntaje")
  }
    }
    public ispenalize(){
     return this.isPenalized
    }
    public changepenaliza(){
      this.isPenalized = true;
    }
    public tempPenalize(scoring:number){
      if(scoring >= 6){
          console.log("imposible alquilar por una semana")
    }else {
      console.log("El usuario esta en condiciones de seguir alquilando")
    }
  
  }
  
  }