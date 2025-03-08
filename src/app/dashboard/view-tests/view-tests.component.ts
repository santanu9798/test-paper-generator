import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TestPaperService, TestPaper, Distribution } from '../../services/test-paper.service';
import { Router } from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-view-tests',
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgForOf
  ],
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.scss']
})
export class ViewTestsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'courseName', 'courseCode', 'totalMarks', 'totalQuestions', 'credit', 'totalTime', 'distributions', 'actions'];
  dataSource = new MatTableDataSource<TestPaper>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private testPaperService: TestPaperService, private router: Router) {}

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
        console.log('Loaded test papers:', testPapers); // Debug: Check if data has IDs
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

  editTestPaper(test: TestPaper): void {
    if (test.id) {
      this.router.navigate(['/dashboard/edit-test', test.id]).then(success => {
        if (success) {
          console.log('Navigated to edit test paper:', test.id);
        } else {
          console.error('Navigation to edit-test failed');
        }
      });
    } else {
      console.error('Test paper ID is missing');
    }
  }

  viewTestPaper(test: TestPaper): void {
    if (test.id) {
      this.router.navigate(['/dashboard/view-test', test.id]).then(success => {
        if (success) {
          console.log('Navigated to view test paper:', test.id);
        } else {
          console.error('Navigation to view-test failed');
        }
      });
    }
  }

  deleteTestPaper(test: TestPaper): void {
    if (test.id && confirm('Are you sure you want to delete this test paper?')) {
      this.testPaperService.deleteTestPaper(test.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(t => t.id !== test.id);
          console.log('Test paper deleted:', test);
        },
        error: (err) => {
          console.error('Error deleting test paper:', err);
        }
      });
    }
  }

  exportToPdf(test: TestPaper): void {
    console.log('Exporting test paper to PDF:', test);
    alert('PDF export triggered for ' + test.name + ' (placeholder)');
  }
}
