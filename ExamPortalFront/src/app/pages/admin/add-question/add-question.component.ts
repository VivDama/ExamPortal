import { CommonModule, JsonPipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [JsonPipe, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, CommonModule,CKEditorModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {

  public editor = ClassicEditor;

  qId: any;
  qTitle: any;
  question = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qId: ''
    },
  };
  Toast = Swal.mixin({
    toast: true,
    timer: 3000,
    timerProgressBar: true
  });

  constructor(private _route: ActivatedRoute, private _questionService: QuestionService, private _snack: MatSnackBar,private _router:Router) { }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['qtitle'];
    this.question.quiz.qId = this.qId;
  }

  public addQuestion() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open("Question is missing!", "Ok", {
        duration: 3000
      });
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this._snack.open("Option1 is missing!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this._snack.open("Option2 is missing!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      this._snack.open("Option3 is missing!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      this._snack.open("Option4 is missing!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.question.answer == null) {
      this._snack.open("answer is missing!", "Ok", {
        duration: 3000
      });
      return;
    }

    //submit question
    this._questionService.addQuestion(this.question).subscribe({
      next: (data: any) => {
        this.Toast.fire('Success !!', 'Question has been added successfully', 'success')
          .then(() => {this._router.navigate(['/admin/view-questions/'+this.qId+'/'+this.qTitle]) });
        this.question = {
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
          quiz: {
            qId: ''
          },
        };
      },
      error: (error: any) => {
        Swal.fire('Error !!', 'Internal error while adding new Question', 'error');
      }
    })
  }

}
