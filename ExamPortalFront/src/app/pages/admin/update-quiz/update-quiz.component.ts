import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  quizData: any;
  categories: any;
  Toast = Swal.mixin({
    toast: true,
    timer: 3000,
    timerProgressBar: true
  });

  constructor(private _route: ActivatedRoute, private _quizService: QuizService, private _categoryService: CategoryService, private _snack: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    //alert(this.qId);
    this._categoryService.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error: any) => {
        Swal.fire('Error !!', 'Internal error while retrieving Categories info from server', 'error');
      }
    })
    this._quizService.getQuiz(this.qId).subscribe({
      next: (data: any) => {
        this.quizData = data;
        console.log(this.quizData);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  public updateQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open("Title is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quizData.description.trim() == '' || this.quizData.description == null) {
      this._snack.open("Description is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quizData.maxMarks == null) {
      this._snack.open("Marks for the quiz is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quizData.questionCount == null) {
      this._snack.open("Total no of questions is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quizData.category == null) {
      this._snack.open("please select category!", "Ok", {
        duration: 3000
      });
      return;
    }

    this._quizService.updateQuiz(this.quizData).subscribe({
      next: (data: any) => {
        this.Toast.fire('Success !!', 'Quiz has been updated successfully', 'success')
          .then(() => {/*window.location.href = '/admin/quizzes';*/
            this._router.navigate(['/admin/quizzes'])
          });
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          questionCount: '',
          isActive: true,
          category: {
            cid: ''
          }
        }

      },
      error: (error: any) => {
        Swal.fire('Error !!', 'Internal error while updating the Quiz', 'error');
      }
    });
  }

}
