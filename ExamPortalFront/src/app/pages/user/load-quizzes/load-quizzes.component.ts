import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-load-quizzes',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './load-quizzes.component.html',
  styleUrl: './load-quizzes.component.css'
})
export class LoadQuizzesComponent implements OnInit {

  catId:any;
  quizzes=[{
    qId:'',
    title:'',
    description:'',
    maxMarks:'',
    questionCount:'',
    isActive:'',
    category:{
      title:'',
    }
  },
  ];

  constructor(private _route:ActivatedRoute, private _quizService:QuizService){}


  ngOnInit(): void {
    

    this._route.params.subscribe({
      next:(params:any)=>{
        this.catId=this._route.snapshot.params['catId'];
        if(parseInt(this.catId)<=0){
      
          this._quizService.getActiveQuizzes().subscribe({
            next:(data:any)=>{
              this.quizzes=data;console.log(this.quizzes);
            },
            error:(error:any)=>{
              alert("Error in loading data");
            }
          })
        }
        else{
          //alert("Loading specific quiz based on category");
          this._quizService.getActiveQuizzesOfCategory(this.catId).subscribe({
            next:(data:any)=>{
              this.quizzes=data;
            },
            error:(error:any)=>{
              alert("error in loading data for the selected category");
            }
          })
        }
      }
    });

    
  }

}
