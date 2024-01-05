import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,RouterModule,JsonPipe,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  categories:any;
  constructor(private _categoryService:CategoryService,private _snack:MatSnackBar){}
  ngOnInit(): void {
    this._categoryService.categories().subscribe({
      next:(data:any)=>{
        this.categories=data;
      },
      error:(error:any)=>{
        this._snack.open('Error in loading categories from the server','ok',{ duration:3000})
      }
    });
  }

}
