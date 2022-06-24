import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  books={

    slno:"",
    bookname:"",
    author:"",
    edition:"",
    imageurl:"",

  }

  constructor(private bookservice:BookService , private route:Router) { }

  ngOnInit(): void {
    let BookId  = localStorage.getItem("Bookdata")
    this.bookservice.getbook(BookId).subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data))
    })
  }

  updatebook(){
    this.bookservice.updatedata(this.books)
      .subscribe((data)=>{console.log(data)})

      this.route.navigate(["books"])
  }

}
