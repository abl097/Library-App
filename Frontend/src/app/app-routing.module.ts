import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './addbook/addbook.component';
import { AuthGuard } from './auth.guard';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [

  {path:"" , component:HomeComponent},
  {path:"signup" , component:SignupComponent},
  {path:"login" , component:LoginComponent},
  {path:"books" , canActivate:[AuthGuard], component:BooksComponent},
  {path:"addbook" , canActivate:[AuthGuard], component:AddbookComponent},
  {path:"updatebook" , component:UpdateComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
