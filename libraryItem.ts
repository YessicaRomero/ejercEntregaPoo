//clase base de los items en stock (revistas o libros)
import { randomUUID as uid } from "node:crypto";

export class LibraryItem {
    private id: string = uid();
    private title: string;
    private year: number;
    private isAvailable: boolean = true;
   
    public constructor(title: string, year: number) {
      this.title = title;
      this.year = year;
      this.id
     
    }
    public setTitle(title: string): void {
      this.title = title;
    }
    public setYear(year: number): void {
      this.year = year;
    }
    public getTitle(): string {
      return this.title;
    }
    public getYear(): number {
      return this.year;
    }
    public isItemAvailable(): boolean {
      return this.isAvailable;
    }
    public markAsUnavailable() {
      this.isAvailable = false;
    }
    public markAsAvailable() {
      this.isAvailable = true;
    }
  }


  //libros
export class Book extends LibraryItem {
    private author: string;
    public constructor(title: string, year: number, author: string) {
      super(title, year);
      this.author = author;
    }
    public setAuthor(author: string): void {
      this.author = author;
    }
    getAuthor() {
      return this.author;
    }
  }
  //revistas
   export class Magazine extends LibraryItem {
    private editor: string;
    public constructor(title: string, year: number, editor: string) {
      super(title, year);
      this.editor = editor;
    }
    public setEditor(editor: string): void {
      this.editor = editor;
    }
    getEditor() {
      return this.editor;
    }
  }