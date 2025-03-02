import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  private apiUrl = 'http://localhost:3000/api/questions';

  constructor(private http: HttpClient) {}

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

  getQuestions(): Observable<{
    question: string,
    type: string,
    topic: string,
    difficulty: string,
    options: string[],
    correctAnswer: string,
    marks: number
  }[]> {
    return this.http.get<{
      question: string,
      type: string,
      topic: string,
      difficulty: string,
      options: string[],
      correctAnswer: string,
      marks: number
    }[]>(this.apiUrl);
  }
}
