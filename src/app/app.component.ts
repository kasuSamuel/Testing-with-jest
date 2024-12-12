import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from './components/home/home.component';
import { QuizPageComponent } from "./components/quiz-page/quiz-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, HomeComponent, QuizPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = '';
  iconsUrl = '';
  score = 0;
  isQuizCompleted = false;

  currentTheme = 'light';

  constructor(){
    this.loadState();
    this.loadTheme();
  }


  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light'? 'dark': 'light';
    const body = document.body;
    body.classList.toggle('dark');
    this.saveTheme();
  }

  saveTheme(){
    localStorage.setItem('theme', this.currentTheme);
  }
  loadTheme(){
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      const body = document.body;
      body.classList.toggle(this.currentTheme);
    }
  }

  loadState(){
    const state = localStorage.getItem('quizAppState');
    if (state) {
      const { title, iconsUrl, score, isQuizCompleted } = JSON.parse(state);
      this.title = title;
      this.iconsUrl = iconsUrl;
      this.score = score;
      this.isQuizCompleted = isQuizCompleted;
    }
  }

  getQuestions(title: string): void {
    this.title = title;
  }

  getIcons(icon: string): void {
    this.iconsUrl = icon;
  }

  resetQuiz(): void {
    this.title = ''; 
    this.iconsUrl = ''; 
    this.score = 0;
    this.isQuizCompleted = false;
  }


}
