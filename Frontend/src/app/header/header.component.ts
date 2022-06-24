import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public user:UserService , private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem("token")
    this.route.navigate(['/login'])
  }
}
