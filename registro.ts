import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as rls from "readline-sync";


export class Prestamo{

    id: string;
fechaDePrestamo: string;
 titulo: string;
 user: string;

    public constructor( titulo:string ,user:string, fechaDePrestamo:string){
       this.titulo = titulo;
      this.user = user;
      this.fechaDePrestamo =fechaDePrestamo
     this.id = crypto.randomUUID();
     
    }
  
}
export class FileManager{
  static readPrestamo(){
try {
  const listaPrestamos = fs.readFileSync("./listaPrestamos.json", { encoding: "utf8" });
  console.log("lectura realizada correctamente")
  return JSON.parse(listaPrestamos) as Prestamo[];
  }
 
 catch (error) {
  console.log("error inesperado", error)
} 
rls.keyInPause("/n");
  }
  static appendPrestamo(data: Prestamo[]){
    try {
      fs.writeFileSync("./listaPrestamos.json", JSON.stringify(data),{ encoding: "utf8"})
      console.log("Operacion completada \n")
      rls.keyInPause("\n");
    } catch (error) {
      console.log("ocurrio un error", error)
      console.log("Operacion completada \n");
    }
  }
}

FileManager.readPrestamo()
/*const Regis1 = new Prestamo("stars" , "yessica",12);
console.log(Regis1)*/