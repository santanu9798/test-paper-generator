import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TestPaperService, TestPaper, Distribution } from '../../services/test-paper.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-view-tests',
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NgForOf
  ],
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.scss']
})
export class ViewTestsComponent implements OnInit {
  // Updated displayedColumns to include distributions
  displayedColumns: string[] = ['name', 'courseName', 'courseCode', 'totalMarks', 'totalQuestions', 'credit', 'totalTime', 'distributions'];
  dataSource = new MatTableDataSource<TestPaper>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private testPaperService: TestPaperService) {}

  ngOnInit(): void {
    this.loadTestPapers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadTestPapers(): void {
    this.testPaperService.getTestPapers().subscribe({
      next: (testPapers) => {
        this.dataSource.data = testPapers;
      },
      error: (err) => {
        console.error('Error loading test papers:', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
