"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
//los lectores
var node_crypto_1 = require("node:crypto");
var User = /** @class */ (function () {
    function User(name, address, phoneNumber) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.scoring = 0;
        this.isPenalized = false;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.setAddress = function (address) {
        this.address = address;
    };
    User.prototype.getAddress = function () {
        return this.address;
    };
    User.prototype.setPhoneNumber = function (phoneNumber) {
        this.phoneNumber = phoneNumber;
    };
    User.prototype.getPhoneNumber = function () {
        return this.phoneNumber;
    };
    User.prototype.getScoring = function () {
        return this.scoring;
    };
    User.prototype.increaseScoring = function (points) {
        this.scoring += points;
        console.log(this.scoring);
    };
    User.prototype.decreaseScoring = function (points) {
        if (this.scoring > 0) {
            this.scoring -= points;
            console.log(this.scoring);
        }
        else {
            console.log("no puede decrecer su puntaje");
        }
    };
    User.prototype.ispenalize = function () {
        return this.isPenalized;
    };
    User.prototype.changepenaliza = function () {
        this.isPenalized = true;
    };
    User.prototype.tempPenalize = function (scoring) {
        if (scoring >= 6) {
            console.log("imposible alquilar por una semana");
        }
        else {
            console.log("El usuario esta en condiciones de seguir alquilando");
        }
    };
    return User;
}());
exports.User = User;
