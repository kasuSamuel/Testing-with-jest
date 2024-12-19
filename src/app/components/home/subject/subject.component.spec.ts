import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectComponent } from './subject.component';

describe('SubjectComponent', () => {
  let component: SubjectComponent;
  let fixture: ComponentFixture<SubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      component.subject = testCase.title;
      expect(component.onMonitorSubject()).toBe(testCase.expected);
    });
  });
});
