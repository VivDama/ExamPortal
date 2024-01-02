import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [MatCardModule, MatListModule, CommonModule, MatIconModule, MatLineModule, MatDividerModule, MatButtonModule,RouterModule],
  providers: [CategoryService],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit {

  categories = [{
    cid: 23,
    title: 'programming',
    description: 'Test your programming knowledge'

  },
  {
    cid: 45,
    title: 'Aptitude',
    description: 'Test your Aptitdue skills'

  },
  {
    cid: 55,
    title: 'General Knowledge',
    description: 'Test your General knowledge'

  }
  ]
  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe({
      next:(data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error !!','Error in loading data','error');
      }
    });
  }

}
