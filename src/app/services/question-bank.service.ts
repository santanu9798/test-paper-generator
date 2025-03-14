import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Question} from '../dashboard/view-questions/view-questions.component';

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
    id:number,
    question: string,
    type: string,
    topic: string,
    difficulty: string,
    options: string[],
    correctAnswer: string,
    marks: number
  }[]> {
    return this.http.get<{
      id:number,
      question: string,
      type: string,
      topic: string,
      difficulty: string,
      options: string[],
      correctAnswer: string,
      marks: number
    }[]>(this.apiUrl);
  }

  updateQuestion(question: {
    id:number,
    question: string,
    type: string,
    topic: string,
    difficulty: string,
    options: string[],
    correctAnswer: string,
    marks: number
  }): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${question.id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
