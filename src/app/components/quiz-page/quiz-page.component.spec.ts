import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizPageComponent } from './quiz-page.component';
import { DataServiceService } from '../../shared/data-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('QuizPageComponent', () => {
  let component: QuizPageComponent;
  let fixture: ComponentFixture<QuizPageComponent>;

  const dataService = {
     getQuizData() {
      return Promise.resolve([]);
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPageComponent],

            providers: [
              HttpClient,
              DataServiceService,
              HttpClientModule
            ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  it('should select an option', () => {
    const option = { 
      isSubmited: false, 
      selectedOption: 1,
      showErrorMessage: false
    };
    component.OnSelectOption(option.selectedOption);
    expect(component.isSubmitted).toEqual(false);
    expect(component.selectedOption).toEqual(1);
    expect(component.showErrorMessage).toEqual(false);
  });

  it('should submit question with correct answer', () => {
    component.isSubmitted = false;
    component.isCorrectAnswer = true;
    component.selectedOption = 1;
    component.showErrorMessage = false;
    component.score = 1;
    component.questions = [
      {
        question: 'What is the correct answer?',
        options: ['Option 1', 'Option 2', 'Option 3'],
        answer: 'Option 1'
      }
    ];
    component.currentQuestionIndex = 0;
    component.submitQuestion();
    expect(component.isSubmitted).toEqual(true);
    expect(component.showErrorMessage).toEqual(false);
    expect(component.isCorrectAnswer).toEqual(false);
    expect(component.score).toEqual(1);
  });
  
  it('should submit question with incorrect answer', () => {
    component.isSubmitted = false;
    component.isCorrectAnswer = false;
    component.selectedOption = 1;
    component.showErrorMessage = false;
    component.score = 0;
    component.questions = [
      {
        question: 'What is the correct answer?',
        options: ['Option 1', 'Option 2', 'Option 3'],
        answer: 'Option 2'
      }
    ];
    component.currentQuestionIndex = 0;
    component.submitQuestion();
    expect(component.isSubmitted).toEqual(true);
    expect(component.showErrorMessage).toEqual(false);
    expect(component.isCorrectAnswer).toEqual(true);
    expect(component.score).toEqual(1);
  });
  
  it('should submit question with no selected option', () => {
    component.isSubmitted = false;
    component.selectedOption = null;
    component.showErrorMessage = false;
    component.submitQuestion();
    expect(component.isSubmitted).toEqual(false);
    expect(component.showErrorMessage).toEqual(true);
  });

it('should display next question', () => {
  component.currentQuestionIndex = 1;
  component.isSubmitted = false;
  component.selectedOption = null;
  component.nextQuestion(); 
  expect(component.currentQuestionIndex).toEqual(1);
  expect(component.isSubmitted).toEqual(false);
  expect(component.selectedOption).toEqual(null);
});

  it('should return correct icon class based on title', () => {
    const testCases = [
      { title: 'HTML', expected: 'html' },
      { title: 'CSS', expected: 'css' },
      { title: 'JavaScript', expected: 'js' },
      { title: 'Accessibility', expected: 'accessibility' },
      { title: 'Unknown', expected: 'logo' },
    ];
  
    testCases.forEach((testCase) => {
      component.title = testCase.title;
      expect(component.onChangeIconBg()).toBe(testCase.expected);
    });
  });

  it('should play again', () => {
    component.title = 'HTML';
    component.iconsUrl = 'test-url';
    component.isSubmitted = true;
    component.selectedOption = 1;
    component.currentQuestionIndex = 1;
    component.score = 10;
    component.playAgain();
    expect(component.title).toEqual('');
    expect(component.iconsUrl).toEqual('');
    expect(component.isSubmitted).toEqual(false);
    expect(component.selectedOption).toEqual(null);
    expect(component.currentQuestionIndex).toEqual(0);
    expect(component.score).toEqual(0);
  });

  it('should emit quizCompleted event with final score', () => {
    const score = 5;
    component.score = score;
    const emitSpy = jest.spyOn(component.quizCompleted, 'emit');
    component.completeQuiz();
    expect(emitSpy).toHaveBeenCalledWith(score);
  });

  it('should save quiz state', () => {
    component.currentQuestionIndex = 1;
    component.score = 10;
    component.isQuizCompleted = true;
    component.saveQuizState();
    expect(localStorage.getItem('quizState')).toEqual(JSON.stringify({ currentQuestionIndex: 1, score: 10, isQuizCompleted: true }));
  });
  
  it('should load quiz state', () => {
    localStorage.setItem('quizState', JSON.stringify({
       currentQuestionIndex: 1, 
       score: 10,
        isQuizCompleted: true }));
    component.loadQuizState();
    expect(component.currentQuestionIndex).toEqual(1);
    expect(component.score).toEqual(10);
    expect(component.isQuizCompleted).toEqual(true);
  });

it('should clear quiz state', () => {
  component.clearQuizState();
  expect(localStorage.getItem('quizState')).toBeNull();
});


}); 
