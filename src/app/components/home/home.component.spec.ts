import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataServiceService } from '../../shared/data-service.service';
import { Quizdata} from '../../shared/data.interface';
import { jest } from '@jest/globals';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        HttpClient,
        DataServiceService,
        HttpClientModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data property on ngOnInit', () => {
    const mockQuizData = [{
      title: 'Sample Quiz 1',
      icon: 'sample-icon-1',
      questions: [
        {
          question: 'Question 1',
          options: ['Option 1', 'Option 2', 'Option 3'],
          answer: 'Option 3'
        },
        {
          question: 'Question 2',
          options: ['Option A', 'Option B', 'Option C'],
          answer: 'Option B'
        }
      ]
    } ] as Quizdata[];

    const dataService = TestBed.inject(DataServiceService);
    jest.spyOn(dataService, 'getQuizData').mockReturnValue(of(mockQuizData));

    component.ngOnInit();

    expect(component.data).toEqual(mockQuizData);  
  });

  it('should emit monitorTitle event when onMonitorSubject is called', () => {
    const subject = 'HTML';
    const expectedTitle = 'HTML';
    const monitorTitleSpy = jest.spyOn(component.monitorTitle, 'emit');
    component.data = [{ title: 'HTML', icon: 'html' }] as Quizdata[];
    component.onMonitorSubject(subject);
    expect(monitorTitleSpy).toHaveBeenCalledWith(expectedTitle);
  });

  it('should emit changeIcon event when onChangeIcon is called', () => {
    const icon = 'html';
    const expectedIcon = 'html';
    const changeIconSpy = jest.spyOn(component.changeIcon, 'emit');
    component.data = [{ title: 'HTML', icon: 'html' }] as Quizdata[];
    component.onChangeIcon(icon);
    expect(changeIconSpy).toHaveBeenCalledWith(expectedIcon);
  });

});
