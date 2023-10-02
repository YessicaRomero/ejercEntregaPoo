"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroManager = void 0;
var registro_1 = require("./registro");
var registro_2 = require("./registro");
var rls = require("readline-sync");
var RegistroManager = /** @class */ (function () {
    function RegistroManager() {
        this.menuOpcion = ["lista Prestamos", "create Prestamo", "Update Prestamo", "Delete Prestamo"];
        this.prestamos = [];
    }
    RegistroManager.prototype.readPrestamos = function () {
        var readResult = registro_2.FileManager.readPrestamo();
        if (readResult) {
            console.log(readResult);
            this.prestamos = readResult;
            console.log("******* Prestamos ***** \n");
            if (!this.prestamos.length) {
                console.log("no hay prestamos");
            }
            else {
                this.prestamos.forEach(function (Prestamo) {
                    console.log("\n                id: ".concat(Prestamo.id, "\n                titulo: ").concat(Prestamo.titulo, "\n                fechaPrestamo: ").concat(Prestamo.fechaDePrestamo, "\n                User: ").concat(Prestamo.user, "\n                -------\n                "));
                });
            }
        }
        rls.keyInPause("\n");
    };
    RegistroManager.prototype.createPrestamo = function () {
        console.log("----crear un prestamo---");
        {
            rls.keyInPause();
            var readResult = registro_2.FileManager.readPrestamo();
            if (readResult) {
                this.prestamos = readResult;
            }
            var titulo = rls.question("Ingrese el titulo: ");
            var user = rls.question("Ingrese el nombre de usuario: ");
            var fechaDePrestamo = rls.question("ingrese la fecha: ");
            var newPrestamo = new registro_1.Prestamo(titulo, user, fechaDePrestamo);
            this.prestamos.push(newPrestamo);
            rls.keyInPause();
            registro_2.FileManager.appendPrestamo(this.prestamos);
            console.log(this.prestamos);
        }
    };
    RegistroManager.prototype.UpdatePrestamo = function () {
        console.log("update Prestamo...");
        rls.keyInPause();
        var readResult = registro_2.FileManager.readPrestamo();
        if (readResult) {
            this.prestamos = readResult;
        }
        var idToUpdate = rls.question("Ingrese el Id: ");
        var recordIndex = this.prestamos.findIndex(function (prestamos) { return prestamos.id === idToUpdate; });
        if (recordIndex !== -1) {
            var recordToUpdate = this.prestamos[recordIndex];
            var confirmation = rls.keyInYN("Do you want to Update   ".concat(recordToUpdate.titulo, " ?"));
            if (confirmation) {
                var newTitulo = rls.question("Ingrese el titulo: ");
                recordToUpdate.titulo = newTitulo;
                registro_2.FileManager.appendPrestamo(this.prestamos);
            }
            else {
                console.log(" cancelado, prestamo no encontrado. \n");
            }
        }
        else {
            console.log("Album not found.\n");
        }
        rls.keyInPause();
    };
    RegistroManager.prototype.deletePrestamo = function () {
        console.log("----borrar-------");
        var DeleteId = rls.question("Ingrese el Id que desea eliminar: ");
        var recordPrestamo = this.prestamos.findIndex(function (Prestamo) { return Prestamo.id === DeleteId; });
        if (recordPrestamo !== -1) {
            var recordtoDelete = this.prestamos[recordPrestamo];
            var confirmacion = rls.keyInYN("seguro quieres eliminar? ".concat(recordtoDelete.titulo, " ? Y/N"));
            if (confirmacion) {
                this.prestamos.splice(recordPrestamo, 1);
                registro_2.FileManager.appendPrestamo(this.prestamos);
            }
            else {
                console.log("No se elimino");
            }
        }
        else {
            console.log("prestamo no encontrado");
        }
        rls.keyInPause("\n");
    };
    RegistroManager.prototype.menu = function () {
        while (true) {
            console.clear();
            var choice = rls.keyInSelect(this.menuOpcion);
            switch (choice) {
                case 0:
                    this.readPrestamos();
                    break;
                case 1:
                    this.createPrestamo();
                    break;
                case 2:
                    this.UpdatePrestamo();
                    break;
                case 3:
                    this.deletePrestamo();
                    break;
                default:
                    console.log("Vuelva pronto");
                    return;
            }
        }
    };
    return RegistroManager;
}());
exports.RegistroManager = RegistroManager;
var recordMan = new RegistroManager();
recordMan.menu();
