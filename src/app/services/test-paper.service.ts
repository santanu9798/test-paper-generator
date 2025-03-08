import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the interfaces based on the DTO structure
export interface TestPaper {
  id: number,
  name: string;
  courseName: string;
  courseCode: string;
  description: string;
  totalMarks: number;
  totalQuestions: number;
  credit: number;
  totalTime: number;
  distributions: Distribution[];
}

export interface Distribution {
  type: string;
  count: number;
  marksPerQuestion: number;
}

@Injectable({
  providedIn: 'root'
})
export class TestPaperService {
  private apiUrl = 'http://localhost:3000/api/test-papers'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  createTestPaper(testPaperData: TestPaper): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/generate`, testPaperData);
  }

  getTestPapers(): Observable<TestPaper[]> {
    return this.http.get<TestPaper[]>(this.apiUrl);
  }

  getTestPaper(id: number): Observable<TestPaper> {
    return this.http.get<TestPaper>(`${this.apiUrl}/${id}`);
  }

  deleteTestPaper(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
