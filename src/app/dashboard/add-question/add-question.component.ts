import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { QuestionBankService } from '../../services/question-bank.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-question',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {
  question: string = '';
  type: string = 'MCQ';
  topic: string = '';
  difficulty: string = 'EASY';
  options: string[] = ['', '', '', ''];
  correctAnswer: string = '';
  marks: number = 1;
  successMessage: string = '';
  errorMessage: string = '';

  questionTypes: string[] = ['MCQ', 'SHORT', 'TRUE_FALSE', 'LONG'];
  difficultyLevels: string[] = ['EASY', 'MEDIUM', 'HARD'];

  constructor(private questionBankService: QuestionBankService, protected router: Router) {}

  addQuestion(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';
    const questionData = {
      question: this.question,
      type: this.type,
      topic: this.topic,
      difficulty: this.difficulty,
      options: this.options.filter(opt => opt.trim() !== ''),
      correctAnswer: this.correctAnswer,
      marks: this.marks
    };

    this.questionBankService.addQuestion(questionData).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Question added successfully';
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to add question';
      }
    });
  }
}
