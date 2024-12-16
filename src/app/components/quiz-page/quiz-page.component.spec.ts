import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPageComponent } from './quiz-page.component';
import { DataServiceService } from '../../shared/data-service.service';

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
      providers: [{
        provide: DataServiceService,
        useValue: dataService,
      }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
