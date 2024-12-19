import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let changeThemeSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }) 
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set isChecked to true when dark theme is selected', () => {
    component.isChecked = true;
    component.currentTheme = 'dark';
    component.ngOnInit();
    expect(component.isChecked).toEqual(true);
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
  

     it('should emit changeTheme event when onChangeTheme is called', () => {
       changeThemeSpy = jest.spyOn(component.changeTheme, 'emit');
       component.onChangeTheme();
       expect(changeThemeSpy).toHaveBeenCalled();
     });
}); 
