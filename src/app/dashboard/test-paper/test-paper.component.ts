import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TestPaperService, TestPaper, Distribution } from '../../services/test-paper.service';
import {MatIcon} from '@angular/material/icon';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-test-paper',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIcon,
    NgForOf,
    NgIf
  ],
  templateUrl: './test-paper.component.html',
  styleUrls: ['./test-paper.component.scss']
})
export class TestPaperComponent {
  name: string = '';
  courseName: string = '';
  courseCode: string = '';
  description: string = '';
  totalMarks: number = 0;
  totalQuestions: number = 0;
  credit: number = 0;
  totalTime: number = 0;
  distributions: Distribution[] = [
    { type: 'MCQ', count: 0, marksPerQuestion: 0 }
  ];
  successMessage: string = '';
  errorMessage: string = '';

  questionTypes: string[] = ['MCQ', 'SHORT', 'TRUE_FALSE', 'LONG'];

  constructor(private testPaperService: TestPaperService, protected router: Router) {}

  addDistribution(): void {
    this.distributions.push({ type: 'MCQ', count: 0, marksPerQuestion: 0 });
  }

  removeDistribution(index: number): void {
    if (this.distributions.length > 1) {
      this.distributions.splice(index, 1);
    }
  }

  createTestPaper(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';
    const testPaperData: TestPaper = {
      name: this.name,
      courseName: this.courseName,
      courseCode: this.courseCode,
      description: this.description,
      totalMarks: this.totalMarks,
      totalQuestions: this.totalQuestions,
      credit: this.credit,
      totalTime: this.totalTime,
      distributions: this.distributions
    };

    this.testPaperService.createTestPaper(testPaperData).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Test paper created successfully';
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to create test paper';
      }
    });
  }
}
