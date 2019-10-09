import { Component } from '@angular/core';

class Book{
  title: String;
  pubDate: Date;
  type: String;
  summary: String;

  constructor(title, pubDate, type, summary){
    this.title = title;
    this.pubDate = pubDate;
    this.type = type;
    this.summary = summary;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  database = [];
  bookTitle: String;
  pubDate: Date;
  bookType: String;
  bookSummary: String;

  addBook(): void{
    let book = {
      bookTitle: this.bookTitle,
      pubDate: this.pubDate,
      bookType: this.bookType,
      bookSummary: this.bookSummary
    }
    this.database.push(book);
  }

  deleteBook(index: number): void{
    this.database.splice(index, 1);
  }

  countHardCover(): number{
    let hardCoverCount: number = 0;
    for(let i = 0; i < this.database.length; i++){
      if(this.isHardCover(i)){
        hardCoverCount++;
      }
    }
    return hardCoverCount;
  }

  deleteHardCover(): void{
    let index: number = 0;
    while(this.countHardCover() > 0){
      if(this.isHardCover(index)){
        this.deleteBook(index);
      }
      else{
        index++;
      }
    }
  }

  deleteNBook(numDelete: number): void{
    if(numDelete > this.database.length){
      throw new Error("Cannot delete");
    }
    this.database.splice(0,numDelete);
  }

  private isHardCover(index): boolean{
    return this.database[index].bookType == "Hard Cover";
  }
}
