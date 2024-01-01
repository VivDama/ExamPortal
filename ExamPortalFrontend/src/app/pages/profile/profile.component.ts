import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, JsonPipe } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { LoginHTTPService } from '../../services/login-http.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, JsonPipe, CommonModule],
  providers: [LoginHTTPService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private loginHttp: LoginHTTPService) { }

  ngOnInit(): void {
    this.loginHttp.getCurrentUser().subscribe({
      next: (user: any) => {
        console.log("User loaded: " +user.username);
        this.user=user;
      },
      error:(error:any)=>{
        console.log("Couldnot get user from server: profile.componetn.ts")
      }
    })
  }

}
