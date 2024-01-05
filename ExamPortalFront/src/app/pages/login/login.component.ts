import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { LoginHTTPService } from '../../services/login-http.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule,MatSnackBarModule,MatCardModule],
  providers:[MatSnackBar,LoginService,UserService,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData={
    username:"",
    password:""
  };

  constructor(private snack:MatSnackBar, private login:LoginService,private loginHttp:LoginHTTPService, private router:Router){}

  formSubmit(){
    console.log('login button clicked '+this.loginData.username+', '+this.loginData.password);
    if(this.loginData.username.trim() == '' || this.loginData.username == null){
      this.snack.open("Username cannot be null!","ok",{
        duration:3000,
      });
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.snack.open("Password field cannot be null!","ok",{
        duration:3000,
      });
      return;
    }

    // request server to generate token
    this.loginHttp.generateToken(this.loginData)
    .subscribe({
      next:(data:any)=>{
        console.log('success');
        console.log(data);

        //token has been successfully created
        this.login.loginUser(data.token);
        this.loginHttp.getCurrentUser().subscribe({
          next:(user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect... ADMIN : admin dashboard
            //redirect... NORMAL : normal dashboard

            if(this.login.getUserRole() == "ADMIN"){
              //display admin dashboard
              window.location.href="/admin";              
              // this.router.navigate(['admin']);
              // this.login.loginStatusSubject.next(true);           
            }
            else if(this.login.getUserRole() == "NORMAL"){
              //display user dashboard
              window.location.href="/user-dashboard/0";
              // this.router.navigate(['user-dashboard']);
              // this.login.loginStatusSubject.next(true);              
            }
            else{
              this.login.logout();              
            }
          }
        })
      },
      error:(error:any)=>{
        console.log("Error "+ error);
        this.snack.open("Invalid Details! Username or Password incorrect","ok",{duration:5000});
      }
    });

  }
}
