import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuestionBankService } from '../../services/question-bank.service';

export interface Question {
  question: string;
  type: string;
  topic: string;
  difficulty: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}

@Component({
  selector: 'app-view-questions',
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit {
  displayedColumns: string[] = ['question', 'type', 'topic', 'difficulty', 'options', 'correctAnswer', 'marks'];
  dataSource = new MatTableDataSource<Question>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private questionBankService: QuestionBankService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadQuestions(): void {
    this.questionBankService.getQuestions().subscribe({
      next: (questions) => {
        this.dataSource.data = questions;
      },
      error: (err) => {
        console.error('Error loading questions:', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
