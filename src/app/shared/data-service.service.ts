import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Quizdata } from '../../app/shared/data.interface'; // Ensure this path is correct

export interface QuizResponse { 
  quizzes: Quizdata[];
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {  // Renamed to remove redundancy
  dataUrl = 'assets/data.json'; 

  private http = inject(HttpClient);

  getQuizData(): Observable<Quizdata[]> {
    return this.http.get<QuizResponse>(this.dataUrl).pipe(
      map(response => response.quizzes),  // Extract quizzes array
      catchError(this.handleError)  // Handle any errors
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));  
  }
}
