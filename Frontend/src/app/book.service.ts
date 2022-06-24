import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }


  getbooks(){
    return this.http.get("http://localhost:3000/books")
  }

 addbook(data:any){
  return this.http.post("http://localhost:3000/add" , {data:data})
 }

 
 deletedata(id:any){
  return  this.http.delete("http://localhost:3000/delete/"+id)

}
getbook(id:any){
  return  this.http.get('http://localhost:3000/'+id)

}

updatedata(data:any){
return  this.http.put('http://localhost:3000/update' , data)

}



}
