import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Quizdata } from '../../app/shared/data.interface'; 

interface QuizResponse { // Interface for the structure of the JSON
  quizzes: Quizdata[];
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

 private dataUrl = 'assets/data.json'; 

  constructor(private http: HttpClient) { }

  getQuizData(): Observable<Quizdata[]> {
    return this.http.get<QuizResponse>(this.dataUrl).pipe(
      map(response => response.quizzes), 
      catchError(error => {
        console.error('Error fetching quiz data', error);
        return throwError(() => new Error('Error fetching quiz data'));
      })    );
  }


}