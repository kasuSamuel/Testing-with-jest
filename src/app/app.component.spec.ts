import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        HttpClientModule
      ],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }); 



  it('should toggle theme when the app is loaded', () => { 
    const app: AppComponent = TestBed.createComponent(AppComponent).componentInstance;
    app.toggleTheme();
    expect(app.currentTheme).toBe('dark');
  }) 

  it('should save the theme to localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => undefined);
    const app: AppComponent = TestBed.createComponent(AppComponent).componentInstance;
    app.currentTheme = 'dark'; 
        app.saveTheme();
        expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
  });


  it('should load the theme to localStorage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => JSON.stringify('dark'));
    const app: AppComponent = TestBed.createComponent(AppComponent).componentInstance;
    app.loadTheme();
    expect(getItemSpy).toHaveBeenCalledWith('theme');
    expect(app.currentTheme).toEqual('dark');
    
    // Cleanup the mock after the test
    getItemSpy.mockRestore();
  });
  
  it('should load state from localStorage', () => {
    const mockState = {
      title: 'Test Title',
      iconsUrl: 'http://example.com/icons',
      score: 100,
      isQuizCompleted: true
    };
    jest.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => JSON.stringify(mockState));
    const app: AppComponent = TestBed.createComponent(AppComponent).componentInstance;
    app.loadState();
  
    // Assert: Check if the values were correctly loaded into the component
    expect(app.title).toEqual('Test Title');
    expect(app.iconsUrl).toEqual('http://example.com/icons');
    expect(app.score).toEqual(100);
    expect(app.isQuizCompleted).toEqual(true);
  });
  


it ('get questions', ()=>{
  const app: AppComponent =
   TestBed.createComponent(AppComponent).componentInstance;
  app.getQuestions('test');
  expect(app.title).toEqual('test');
});

it('get icon', ()=>{
  const app: AppComponent = 
  TestBed.createComponent(AppComponent).componentInstance;
  app.getIcons('icon');
  expect(app.iconsUrl).toEqual('icon');
});

it('reset quiz', ()=>{
  const app: AppComponent = 
  TestBed.createComponent(AppComponent).componentInstance;
  app.resetQuiz();
  expect(app.title).toEqual('');
  expect(app.score).toEqual(0);
  expect(app.iconsUrl).toEqual('');
  expect(app.isQuizCompleted).toEqual(false);
});

});
