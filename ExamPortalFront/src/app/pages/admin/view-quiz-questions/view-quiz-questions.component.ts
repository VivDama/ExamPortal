import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatDividerModule,MatButtonModule,RouterModule],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit{
  qId:any;
  qTitle:any;
  questions =[{
    quesId:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qId:''
    },

  }
    

  ];
  constructor(private _route:ActivatedRoute, private _questionService:QuestionService){}
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._questionService.getAllQuestionsOfQuiz(this.qId).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.questions=data;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  public deleteQuestion(question:any){
    Swal.fire({
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes, Delete',
      title:'Are you sure you want to delete the question('+question.content+')?',
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this._questionService.deleteQuestion(question.quesId).subscribe({
          next:(data:any)=>{
            this.questions = this.questions.filter((questionItem)=> questionItem.quesId !=question.quesId);
            Swal.fire("Success!","Question has been deleted successfully","success");
          },
          error:(error:any)=>{
            Swal.fire("Error!","Error occurred while deleting the question","error");
          }
        })
      }
    });
  }

}
