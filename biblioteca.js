"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { randomUUID as uid } from "node:crypto";
var user_1 = require("./user");
var loan_1 = require("./loan");
var libraryItem_1 = require("./libraryItem");
var libraryItem_2 = require("./libraryItem");
//clase gestora
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
        this.users = [];
        this.loans = [];
    }
    Library.prototype.addItem = function (item) {
        this.items.push(item);
    };
    Library.prototype.addUser = function (user) {
        this.users.push(user);
    };
    Library.prototype.loanItem = function (item, user) {
        if (!this.isUserValid(user)) {
            console.log("Usuario no registrado");
            return;
        }
        var existingItem = this.findItem(item);
        if (!existingItem || !existingItem.isItemAvailable()) {
            console.log("Item no está disponible.");
            return;
        }
        // paso todas las validaciones
        existingItem.markAsUnavailable();
        var loan = new loan_1.Loan(existingItem, user);
        this.loans.push(loan);
        console.log("".concat(user.getName(), " retira \"").concat(item.getTitle(), "\" con fecha de devoluci\u00F3n ").concat(loan
            .getDueDate()
            .toLocaleDateString()));
    };
    Library.prototype.returnItem = function (item, user, returnDate) {
        var loan = this.findActiveLoan(item, user);
        if (!loan) {
            throw new Error("Préstamo no registrado. Revise Título y Usuario");
        }
        var existingItem = this.findItem(item);
        if (existingItem) {
            existingItem.markAsAvailable();
        }
        var dueDate = loan.getDueDate();
        console.log(dueDate);
        if (returnDate >= dueDate) {
            var lateDays = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
            var lateFee = 0;
            switch (true) {
                case lateDays === 1:
                    lateFee = 2;
                    break;
                case lateDays >= 2 && lateDays <= 4:
                    lateFee = 3;
                    break;
                case lateDays >= 5 && lateDays <= 10:
                    lateFee = 6;
                    break;
                case lateDays > 10:
                    user.changepenaliza();
                    break;
            }
            user.increaseScoring(lateFee);
            console.log("".concat(user.getName(), " devolvi\u00F3 \"").concat(item.getTitle(), "\" tarde. Penalizaci\u00F3n: ").concat(lateFee, " puntos."));
            console.log("nueva puntuacion: ", user.getScoring());
        }
        else {
            console.log("".concat(user.getName(), " devolvi\u00F3 \"").concat(item.getTitle(), "\" a tiempo."));
        }
        this.loans = this.loans.filter(function (resLoan) { return resLoan !== loan; });
        console.log("".concat(user.getName(), " devolvi\u00F3 \"").concat(item.getTitle(), "\" en la fecha \"").concat(returnDate.toLocaleDateString(), "\""));
    };
    //busca prestamos 
    Library.prototype.findActiveLoan = function (item, user) {
        return this.loans.find(function (loan) { return loan.getItem() === item && loan.getUser() === user; });
    };
    //si el usuario esta registrado
    Library.prototype.isUserValid = function (user) {
        return this.users.includes(user);
    };
    Library.prototype.findItem = function (item) {
        return this.items.find(function (i) { return i === item; });
    };
    return Library;
}());
var library = new Library();
var book01 = new libraryItem_2.Book("A sangre fría", 1977, "Rodolfo Walsh");
var book02 = new libraryItem_2.Book("live", 2012, "Neruda");
var book03 = new libraryItem_2.Book("livehgh", 2016, "Neruda");
var book04 = new libraryItem_2.Book("livo", 2015, "Neruda");
var magazine01 = new libraryItem_1.Magazine("Pronto", 2011, "Random House Penguin sarasa");
var user01 = new user_1.User("Marcelo Bettini", { street: "Humberto Primo", number: 602, apartment: "1C" }, "123-444-555");
var user02 = new user_1.User("Sergio Fino", {
    street: "Av. Alicia Moreau de Justo",
    number: 1050,
    apartment: "2B",
}, "555-555-555");
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
library.loanItem(book02, user02);
var returnDate = new Date();
returnDate.setDate(returnDate.getDate() + 15); //dias de retraso, 8 mas de lo permitido;
library.returnItem(book02, user02, returnDate);
console.log(user02.scoring);
user02.decreaseScoring(2);
user01.tempPenalize(8); //si esta penalizado
user01.tempPenalize(3); //no esta penalizado
user01.decreaseScoring(-2);
