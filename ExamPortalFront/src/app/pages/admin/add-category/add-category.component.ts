import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, JsonPipe],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  category = {
    title: '',
    description: ''
  }
  Toast = Swal.mixin({
    toast: true,
    timer: 3000,
    timerProgressBar: true
  });

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open("Title is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.category.description.trim() == '' || this.category.description == null) {
      this._snack.open("Description is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    // all done
    this._category.addCategory(this.category).subscribe({
      next: (data: any) => {
        //Swal.fire('Success !!', 'Category has been added successfully', 'success',);
        this.Toast.fire('Success !!', 'Category has been added successfully', 'success')
        .then(()=>{window.location.href = '/admin/categories';});
        this.category.title = '';
        this.category.description = '';
        
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire('Error !!', 'Internal error while adding new Category', 'error');
      }
    })
  }

}
