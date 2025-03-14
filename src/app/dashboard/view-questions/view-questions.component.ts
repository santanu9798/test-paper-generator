import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuestionBankService } from '../../services/question-bank.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {EditQuestionDialogComponent} from '../../edit-question-dialog/edit-question-dialog.component';
import {MatDialog} from '@angular/material/dialog';

export interface Question {
  id:number;
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
    MatInputModule,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit {
  displayedColumns: string[] = ['question', 'type', 'topic', 'difficulty', 'options', 'correctAnswer', 'marks','actions'];
  dataSource = new MatTableDataSource<Question>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private questionBankService: QuestionBankService, private dialog: MatDialog) {}

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

  openEditDialog(question: Question): void {
    const dialogRef = this.dialog.open(EditQuestionDialogComponent, {
      width: '600px',
      data: { ...question } // Pass a copy to avoid direct mutation
    });

    dialogRef.afterClosed().subscribe((result: Question) => {
      if (result) {
        this.questionBankService.updateQuestion(result).subscribe(() => {
          this.loadQuestions(); // Refresh list
        });
      }
    });
  }

  deleteQuestion(id: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionBankService.deleteQuestion(id).subscribe(() => {
        this.loadQuestions(); // Refresh list
      });
    }
  }

}
