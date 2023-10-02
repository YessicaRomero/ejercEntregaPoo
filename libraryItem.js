"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magazine = exports.Book = exports.LibraryItem = void 0;
//clase base de los items en stock (revistas o libros)
var node_crypto_1 = require("node:crypto");
var LibraryItem = /** @class */ (function () {
    function LibraryItem(title, year) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.isAvailable = true;
        this.title = title;
        this.year = year;
        this.id;
    }
    LibraryItem.prototype.setTitle = function (title) {
        this.title = title;
    };
    LibraryItem.prototype.setYear = function (year) {
        this.year = year;
    };
    LibraryItem.prototype.getTitle = function () {
        return this.title;
    };
    LibraryItem.prototype.getYear = function () {
        return this.year;
    };
    LibraryItem.prototype.isItemAvailable = function () {
        return this.isAvailable;
    };
    LibraryItem.prototype.markAsUnavailable = function () {
        this.isAvailable = false;
    };
    LibraryItem.prototype.markAsAvailable = function () {
        this.isAvailable = true;
    };
    return LibraryItem;
}());
exports.LibraryItem = LibraryItem;
//libros
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(title, year, author) {
        var _this = _super.call(this, title, year) || this;
        _this.author = author;
        return _this;
    }
    Book.prototype.setAuthor = function (author) {
        this.author = author;
    };
    Book.prototype.getAuthor = function () {
        return this.author;
    };
    return Book;
}(LibraryItem));
exports.Book = Book;
//revistas
var Magazine = /** @class */ (function (_super) {
    __extends(Magazine, _super);
    function Magazine(title, year, editor) {
        var _this = _super.call(this, title, year) || this;
        _this.editor = editor;
        return _this;
    }
    Magazine.prototype.setEditor = function (editor) {
        this.editor = editor;
    };
    Magazine.prototype.getEditor = function () {
        return this.editor;
    };
    return Magazine;
}(LibraryItem));
exports.Magazine = Magazine;
