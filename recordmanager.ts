import { Prestamo } from "./registro"
import {FileManager} from "./registro"
import * as rls from "readline-sync";

 export class RegistroManager{
prestamos: Prestamo[];
public constructor(){
    this.prestamos = []
}
readPrestamos(){
    const readResult = FileManager.readPrestamo();
    if(readResult){
        console.log(readResult);
        this.prestamos = readResult;
        console.log("******* Prestamos ***** \n");
        if(!this.prestamos.length){
            console.log("no hay prestamos")
        }else{
            this.prestamos.forEach( Prestamo =>{
                console.log(`
                id: ${Prestamo.id}
                titulo: ${Prestamo.titulo}
                fechaPrestamo: ${Prestamo.fechaDePrestamo}
                User: ${Prestamo.user}
                -------
                `)
            })
        }
    }
    rls.keyInPause("\n")
} 
createPrestamo(){
    console.log("----crear un prestamo---");
    {

        rls.keyInPause();
        const readResult = FileManager.readPrestamo();
        if (readResult) {
          this.prestamos = readResult;
        }
        const titulo  = rls.question("Ingrese el titulo: ");
        const user = rls.question("Ingrese el nombre de usuario: ");
        const fechaDePrestamo = rls.question("ingrese la fecha: ");
       
        const newPrestamo = new Prestamo(titulo,user, fechaDePrestamo );
        this.prestamos.push(newPrestamo);
        rls.keyInPause();
        FileManager.appendPrestamo (this.prestamos);
        console.log (this.prestamos);
    
      }


}
UpdatePrestamo(){
    console.log("update Prestamo...")
    rls.keyInPause();
    const readResult = FileManager.readPrestamo();
    if (readResult) {
      this.prestamos = readResult;
    }
    const idToUpdate = rls.question("Ingrese el Id: ");
    const recordIndex = this.prestamos.findIndex(
      (prestamos) => prestamos.id === idToUpdate
    ) 
    if (recordIndex !== -1) {
      const recordToUpdate = this.prestamos[recordIndex];
      const confirmation = rls.keyInYN(
        `Do you want to Update   ${recordToUpdate.titulo} ?`
      );
      if (confirmation) {
        const newTitulo=rls.question("Ingrese el titulo: ")
        recordToUpdate.titulo=newTitulo;
        FileManager.appendPrestamo(this.prestamos);
      } else {
        console.log(" cancelado, prestamo no encontrado. \n");
      }
    } else {
      console.log("Album not found.\n");
    }
    rls.keyInPause();





}
deletePrestamo(){
    console.log("----borrar-------")
    const DeleteId = rls.question("Ingrese el Id que desea eliminar: ")
   const recordPrestamo = this.prestamos.findIndex((Prestamo) => Prestamo.id === DeleteId);
    if(recordPrestamo !== -1){
        const recordtoDelete = this.prestamos[recordPrestamo];
        const confirmacion = rls.keyInYN(`seguro quieres eliminar? ${recordtoDelete.titulo} ? Y/N`);
        if(confirmacion){
            this.prestamos.splice(recordPrestamo, 1);
            FileManager.appendPrestamo(this.prestamos)
        }else{
            console.log("No se elimino")
        } 
          
    } else {
        console.log("prestamo no encontrado")
    }
rls.keyInPause("\n")

}



menu(){
while(true){
console.clear();
const choice = rls.keyInSelect(this.menuOpcion)
switch(choice){
    case 0 : 
    this.readPrestamos()
    break
    case 1 :
        this.createPrestamo()
        break
        case 2 :
            this.UpdatePrestamo()
            break
            case 3:
                this.deletePrestamo()
                break;
                default:
                console.log("Vuelva pronto")
                return;
}
}
}
menuOpcion = ["lista Prestamos", "create Prestamo", "Update Prestamo", "Delete Prestamo"]
}
const recordMan = new RegistroManager();
recordMan.menu()