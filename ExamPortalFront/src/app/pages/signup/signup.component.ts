import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { timer } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule,MatSnackBarModule,MatCardModule],
  providers:[UserService,MatSnackBar],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  //private userService:UserService;
  constructor(private userService: UserService, private snack:MatSnackBar) { 
    console.log("Executed Signup component");
  };
  //constructor(){}
  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  formSubmit() {

    if (this.user.username == '' || this.user.username == null) {
      //alert("User name cannot be null");
      this.snack.open("Username is required!","ok",{
        duration:5000,
        verticalPosition:"bottom",
        horizontalPosition:"center"
      });
      return;
    }
    //add user Service
      this.userService.addUser(this.user).subscribe( 
        {
          next: (data)=>{
            console.log(data);
            //a//lert("Success");
            Swal.fire('Success','You have registered successfully','success');
            Swal.mixin({
              timer:3000,
              position:"top-right"
            });
          },
          error: (error)=>{
            console.log(error);
           //alert("Something went wrong");
           this.snack.open(error.error,"ok",{
            duration:3000,
            verticalPosition:"bottom",
            horizontalPosition:"center"
          })
          }
        } 
      );
  }

}
