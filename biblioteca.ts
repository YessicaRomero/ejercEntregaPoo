//import { randomUUID as uid } from "node:crypto";
import { User } from "./user";
import { Loan } from "./loan";
import { LibraryItem } from "./libraryItem";
import { Magazine } from "./libraryItem";
import { Book } from "./libraryItem";






//clase gestora

class Library {
  private items: LibraryItem[];
  private users: User[];
  private loans: Loan[];
  public constructor() {
    this.items = [];
    this.users = [];
    this.loans = [];
  }
  addItem(item: LibraryItem): void {
    this.items.push(item);
  }
  addUser(user: User): void {
    this.users.push(user);
  }
  loanItem(item: LibraryItem, user: User): void {
    if (!this.isUserValid(user)) {
      console.log("Usuario no registrado");
      return;
    }
    const existingItem: LibraryItem | undefined = this.findItem(item);
    if (!existingItem || !existingItem.isItemAvailable()) {
      console.log("Item no está disponible.");
      return;
    }
    // paso todas las validaciones
    existingItem.markAsUnavailable();
    const loan = new Loan(existingItem, user );
    this.loans.push(loan);
    console.log(
      `${user.getName()} retira "${item.getTitle()}" con fecha de devolución ${loan
        .getDueDate()
        .toLocaleDateString()}`
    );
  }

  returnItem(item: LibraryItem, user: User, returnDate: Date): void {
    const loan = this.findActiveLoan(item, user);
    if (!loan) {
        throw new Error("Préstamo no registrado. Revise Título y Usuario");
    
      
      
    }
    const existingItem = this.findItem(item);
    if (existingItem) {
      existingItem.markAsAvailable();
    }

    const dueDate = loan.getDueDate ();
    console.log(dueDate)
    if ( returnDate >= dueDate) {
      const lateDays = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
    
     let lateFee = 0; 
      switch (true) {
        case  lateDays === 1:
            lateFee = 2
            
            break;
            case lateDays >= 2 && lateDays <= 4:
               lateFee = 3;
                break;
                case lateDays  >= 5 && lateDays <= 10 :
                    lateFee = 6
                    break;
                    case lateDays > 10 :
                        user.changepenaliza();

        
            break;
      }
    
      
 user.increaseScoring(lateFee);
      
      console.log(`${user.getName()} devolvió "${item.getTitle()}" tarde. Penalización: ${lateFee} puntos.`);
         
      console.log("nueva puntuacion: " , user.getScoring())
    }   
    else {
      console.log(`${user.getName()} devolvió "${item.getTitle()}" a tiempo.`);
    }
    this.loans = this.loans.filter((resLoan) => resLoan !== loan);
    console.log(`${user.getName()} devolvió "${item.getTitle()}" en la fecha "${returnDate.toLocaleDateString()}"`);
  }
  //busca prestamos 
  private findActiveLoan(item: LibraryItem, user: User): Loan | undefined {
    return this.loans.find(
      (loan) => loan.getItem() === item && loan.getUser() === user
    );
  }
  //si el usuario esta registrado
  private isUserValid(user: User): boolean {
    return this.users.includes(user);
  }
  private findItem(item: LibraryItem): LibraryItem | undefined {
    return this.items.find((i) => i === item);
  }
}

const library = new Library();
const book01 = new Book("A sangre fría", 1977, "Rodolfo Walsh");
const book02 = new Book("live", 2012, "Neruda");
const book03 = new Book("livehgh", 2016, "Neruda");
const book04 = new Book("livo", 2015, "Neruda");

const magazine01 = new Magazine("Pronto", 2011, "Random House Penguin sarasa");
const user01 = new User(
  "Marcelo Bettini",
  { street: "Humberto Primo", number: 602, apartment: "1C" },
  "123-444-555"
);
const user02 = new User(
  "Sergio Fino",
  {
    street: "Av. Alicia Moreau de Justo",
    number: 1050,
    apartment: "2B",
  },
  "555-555-555"
);



library.addItem(book01);
library.addItem(book02);
library.addItem(book03);
library.addItem(book04);
library.addItem(magazine01);
library.addUser(user01);
library.addUser(user02); //agrega usuario
library.loanItem(book01, user01);
library.loanItem(book01, user02); //usuario no registrado

/*library.loanItem(book01, user02); //item no disponible
const returnDate = new Date();//fecha de devolucion
console.log( "returnDate", returnDate.getDate() );

library.loanItem(book02, user01);//se vuelve a realizar otro pr
returnDate*/
library.loanItem(book02,user02)
const returnDate = new Date() ;
returnDate.setDate(returnDate.getDate() +15)//dias de retraso, 8 mas de lo permitido;
library.returnItem(book02, user02, returnDate);
console.log(user02.scoring);
user02.decreaseScoring(2)//aca les muestro que que el puntaje resta lo q le paso x parametro
user01.tempPenalize(8)//si esta penalizado
user01.tempPenalize(3)//no esta penalizado
user01.decreaseScoring(-2)// aca compruebo que los points tienen que ser mayor a 0

