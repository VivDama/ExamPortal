import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SignupComponent } from './pages/signup/signup.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { authInterceptorProviders } from './services/auth.interceptor';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, MatButtonModule, NavbarComponent,RouterOutlet,MatInputModule, MatFormFieldModule,]
})


export class AppComponent {
  title = 'ExamPortal';
}
