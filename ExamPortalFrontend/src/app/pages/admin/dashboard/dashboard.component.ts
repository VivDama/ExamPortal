import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../../profile/profile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatListModule,MatCardModule,SidebarComponent,RouterOutlet,ProfileComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
