import { Injectable } from '@angular/core';
import { Quizdata } from '../../app/shared/data.interface';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  dataUrl = '../assets/data.json';

  quizData: Quizdata[] = [];


  async getQuizData(): Promise<Quizdata[]> {
    try {
      const response = await fetch(this.dataUrl);
      const data = await response.json();
      this.quizData = data.quizzes;
      return this.quizData;
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      throw error;
    }
  }


}
