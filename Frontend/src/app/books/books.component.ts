import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books=[{

    slno:"",
    bookname:"",
    author:"",
    edition:"",
    imageurl:"",

  }]




  constructor(private bookservice:BookService , private route:Router) { }

  ngOnInit(): void {

    this.bookservice.getbooks().subscribe((data)=>{this.books=JSON.parse(JSON.stringify(data))})
  }

  deletedata(item:any){
    this.bookservice.deletedata(item._id)
    .subscribe((data)=>{
      this.books=this.books.filter(p=>p!==item)
    })
      
  }

  updatedata(item:any){

    localStorage.setItem("Bookdata" , item._id.toString())
    this.route.navigate(["updatebook"])

  }

}
