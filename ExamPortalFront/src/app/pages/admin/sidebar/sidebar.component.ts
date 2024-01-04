import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private login:LoginService){}

  public logout(){
    this.login.logout();
   // this.isLoggedIn=false;
    window.location.reload();
  }


}
