import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [MatCardModule,FormsModule,CommonModule,MatButtonModule,RouterModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit{

  quizzes=[
    {
      qId:23,
      title:'Java basics',
      description:'A short quiz to put your Java basics to test',
      maxMarks:50,
      questionCount:20,
      isActive:'',
      category:{
        title:'Programming',
      }
    },
    {
      qId:23,
      title:'Java basics',
      description:'A short quiz to put your Java basics to test',
      maxMarks:50,
      questionCount:20,
      isActive:'',
      category:{
        title:'Programming',
      }
    }
  ]

  constructor(private _quizService:QuizService){}

  ngOnInit(): void {

    this._quizService.quizzes().subscribe({
      next:(data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire("Error !","Error in loading data","error");
      }
    })
    
  }

  deleteQuiz(quiz:any){
    Swal.fire({
      icon:'warning',
      title:'Are you sure you want to delete quiz '+quiz.title +'?',
      confirmButtonText: "Yes, Delete",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this._quizService.deleteQuiz(quiz.qId).subscribe({
          next:(data:any)=>{
            this.quizzes = this.quizzes.filter((quizItem)=> quizItem.qId !=quiz.qId);
            Swal.fire("Success!","Quiz has been deleted successfully","success");
          },
          error:(error:any)=>{
            Swal.fire("Error!","Error occurred while deleting the quiz","error");
          }
        })
      }
    })
  }
}
