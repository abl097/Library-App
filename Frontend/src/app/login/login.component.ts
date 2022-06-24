import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userservice:UserService , private route:Router) { }
  user={
    username:"",
    password:""
  }

  ngOnInit(): void {
    

  }
  loginuser(){
    this.userservice.loginuser(this.user).subscribe((res)=>{
      localStorage.setItem('token' , res.token)
      this.route.navigate(["/books"])
     })
    
  }
}
