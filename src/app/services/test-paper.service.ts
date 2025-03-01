import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the interfaces based on the DTO structure
export interface TestPaper {
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

  /**
   * Creates a new test paper by sending the data to the backend API.
   * @param testPaperData The test paper data to create
   * @returns Observable with the response message
   */
  createTestPaper(testPaperData: TestPaper): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/generate`, testPaperData);
  }

  /**
   * Placeholder method to retrieve all test papers (optional, for future use).
   * @returns Observable with an array of test papers
   */
  getTestPapers(): Observable<TestPaper[]> {
    return this.http.get<TestPaper[]>(this.apiUrl);
  }
}
