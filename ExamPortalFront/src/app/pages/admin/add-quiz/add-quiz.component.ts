import { Component, NgModule, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule,MatButtonModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{

  // categories =[{
  //   cId:'',
  //   title:'',
  //   description:''
  // }];
  categories:any;

  quizData = {
    title:'',
    description:'',
    maxMarks:'',
    questionCount:'',
    isActive:true,
    category:{
      cid:''
    }
  };

  Toast = Swal.mixin({
    toast: true,
    timer: 3000,
    timerProgressBar: true
  });

  constructor(private _categoryService:CategoryService, private _snack:MatSnackBar, private _quizService:QuizService,private _router:Router){}
  ngOnInit(): void {
    this._categoryService.categories().subscribe({
      next:(data:any)=>{
        this.categories=data;
      },
      error:(error:any)=>{
        Swal.fire('Error !!', 'Internal error while retrieving Categories info from server', 'error');
      }
    })
  }
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title == null){
      this._snack.open("Title is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if(this.quizData.description.trim()=='' || this.quizData.description == null){
      this._snack.open("Description is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if(this.quizData.maxMarks == null){
      this._snack.open("Marks for the quiz is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if(this.quizData.questionCount == null){
      this._snack.open("Total no of questions is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if(this.quizData.category == null){
      this._snack.open("please select category!", "Ok", {
        duration: 3000
      });
      return;
    }
    
    this._quizService.addQuiz(this.quizData).subscribe({
      next:(data:any)=>{
        this.Toast.fire('Success !!', 'Quiz has been added successfully', 'success')
        .then(()=>{this._router.navigate(['/admin/quizzes']);});
        this.quizData = {
          title:'',
          description:'',
          maxMarks:'',
          questionCount:'',
          isActive:true,
          category:{
            cid:''
          }
        }

      },
      error:(error:any)=>{
        Swal.fire('Error !!', 'Internal error while adding new Quiz', 'error');
      }
    })
  }

}
