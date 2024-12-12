import { Component, EventEmitter, Input, Output,ChangeDetectionStrategy } from '@angular/core';
import { Quizdata,Questions } from '../../shared/data.interface';
import { DataServiceService } from '../../shared/data-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizPageComponent {
  @Input() title = '';
  @Input() iconsUrl = '';
  @Input() theme = '';
  @Output() resetQuiz = new EventEmitter<void>();
  @Output() quizCompleted = new EventEmitter<number>();


  data: Quizdata[] = [];
  questions: Questions[] = [];
  currentQuestionIndex = 0;
  isSubmitted = false;
  selectedOption: number | null = null;
  isNotSelected = true;
  score = 0;
  isQuizCompleted = false;
  isCorrectAnswer = false;
  showErrorMessage = false;
  

  constructor(private dataService: DataServiceService) { 
    this.loadQuizState();
  }
  

  async ngOnInit() {
    this.data = await this.dataService.getQuizData();
    this.questions = this.data.find(question => question.title === this.title)!.questions
  }

  OnSelectOption(index: number) {
    if(!this.isSubmitted){
      this.isNotSelected = false;
      this.selectedOption = index;
      this.showErrorMessage = false;
    }
  }
  submitQuestion(){
    if(this.selectedOption === null){
      this.showErrorMessage = true;
    }else{
      const selectedAnswer = this.questions[this.currentQuestionIndex].options[this.selectedOption];
      const correctAnswer = this.questions[this.currentQuestionIndex].answer;
      if(selectedAnswer === correctAnswer){
        this.isCorrectAnswer = true;
        this.score +=1;
      }else{
          this.isCorrectAnswer = false;  
      }
      
      this.isSubmitted = true;  
    }
    this.saveQuizState();
  }
  nextQuestion(){
    if(this.currentQuestionIndex < this.questions.length - 1){
      this.currentQuestionIndex++;
    }
    this.isSubmitted = false;
    this.selectedOption = null;
    this.saveQuizState();
  }

  borderClass(index:number):string {
    if (this.selectedOption === index && !this.isSubmitted) {
      return 'selected-not-submitted'
    } else if (this.isSubmitted && this.selectedOption === index && this.isCorrectAnswer) {
      return 'submitted-correct'
    } else if (this.isSubmitted && this.selectedOption === index && !this.isCorrectAnswer) {
      return 'submitted-incorrect'
    } else if (this.isSubmitted) {
      return 'submitted'
    }
    return ''
  }
  optionMarkerColor(index: number): string {
    if (this.selectedOption === index && !this.isSubmitted) {
      return 'selected-option-marker';
    } else if (this.isSubmitted && this.selectedOption === index && this.isCorrectAnswer) {
      return 'correct-option-marker';
    } else if (this.isSubmitted && this.selectedOption === index && !this.isCorrectAnswer) {
      return 'wrong-option-marker';
    }
    return '';
  }
  displayData(){
    this.questions = this.data.find(question => question.title === this.title)!.questions
  }

  onChangeIconBg(){
    switch(this.title){
      case 'HTML':
        return 'html';
      case 'CSS':
        return 'css';
      case 'JavaScript':
        return 'js';
      case 'Accessibility':
        return 'accessibility';
      default:
        return 'logo';
    }
  }

  playAgain(){
    this.title = ''; 
    this.iconsUrl = '';
    this.isSubmitted = false;
    this.selectedOption = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.resetQuiz.emit();
    this.clearQuizState();
  }

  completeQuiz() {
    this.quizCompleted.emit(this.score); // Pass the score to the parent
  }

  saveQuizState() {
    const state = {
      currentQuestionIndex: this.currentQuestionIndex,
      score: this.score,
      isQuizCompleted: this.isQuizCompleted,
    };
    localStorage.setItem('quizState', JSON.stringify(state));
  }
   loadQuizState() {
    const state = localStorage.getItem('quizState');
    if (state) {
      const { currentQuestionIndex, score, isQuizCompleted } = JSON.parse(state);
      this.currentQuestionIndex = currentQuestionIndex;
      this.score = score;
      this.isQuizCompleted = isQuizCompleted;
    }
  }

  clearQuizState() {
    localStorage.removeItem('quizState');
  }
}
