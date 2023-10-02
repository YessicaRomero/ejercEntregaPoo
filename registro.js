"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = exports.Prestamo = void 0;
var crypto = require("node:crypto");
var fs = require("node:fs");
var rls = require("readline-sync");
var Prestamo = /** @class */ (function () {
    function Prestamo(titulo, user, fechaDePrestamo) {
        this.titulo = titulo;
        this.user = user;
        this.fechaDePrestamo = fechaDePrestamo;
        this.id = crypto.randomUUID();
    }
    return Prestamo;
}());
exports.Prestamo = Prestamo;
var FileManager = /** @class */ (function () {
    function FileManager() {
    }
    FileManager.readPrestamo = function () {
        try {
            var listaPrestamos = fs.readFileSync("./listaPrestamos.json", { encoding: "utf8" });
            console.log("lectura realizada correctamente");
            return JSON.parse(listaPrestamos);
        }
        catch (error) {
            console.log("error inesperado", error);
        }
        rls.keyInPause("/n");
    };
    FileManager.appendPrestamo = function (data) {
        try {
            fs.writeFileSync("./listaPrestamos.json", JSON.stringify(data), { encoding: "utf8" });
            console.log("Operacion completada \n");
            rls.keyInPause("\n");
        }
        catch (error) {
            console.log("ocurrio un error", error);
            console.log("Operacion completada \n");
        }
    };
    return FileManager;
}());
exports.FileManager = FileManager;
FileManager.readPrestamo();
/*const Regis1 = new Prestamo("stars" , "yessica",12);
console.log(Regis1)*/ 
