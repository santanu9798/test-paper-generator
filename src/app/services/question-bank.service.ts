import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  private apiUrl = 'http://localhost:3000/api/questions';

  constructor(private http: HttpClient) {}

  // Add a new question to the question bank
  addQuestion(questionData: {
    question: string,
    type: string,
    topic: string,
    difficulty: string,
    options: string[],
    correctAnswer: string,
    marks: number
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, questionData);
  }

  // Placeholder for retrieving all questions (optional, can be implemented later)
  getQuestions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
