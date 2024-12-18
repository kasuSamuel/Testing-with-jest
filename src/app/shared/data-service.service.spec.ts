import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataServiceService } from './data-service.service'; 

describe('DataServiceService', () => {
  let service: DataServiceService;
  let httpMock: HttpTestingController;

  // Test setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  
      providers: [DataServiceService],    
    });

    service = TestBed.inject(DataServiceService);  // Get the service instance
    httpMock = TestBed.inject(HttpTestingController); // Get HttpTestingController to mock requests
  });

  afterEach(() => {
    // Ensure there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch quiz data successfully', () => {
    const mockQuizData = [{
      title: 'Sample Quiz 1',
      icon: 'sample-icon-1',
      questions: [
        { id: 1, question: 'Question 1', options: ['Option 1', 'Option 2', 'Option 3'], answer: 3 },
        { id: 2, question: 'Question 2', options: ['Option A', 'Option B', 'Option C'], answer: 2 },
      ]
    } ];

    // Call the service method
    service.getQuizData().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockQuizData);
    });

    // Mock the HTTP GET request and return the mock data
    const req = httpMock.expectOne(service['dataUrl']);
    expect(req.request.method).toBe('GET');
    req.flush({ quizzes: mockQuizData }); 
  });

  it('should handle error correctly', () => {
    const errorMessage = 'An error occurred while fetching quizzes';

    // Call the service method
    service.getQuizData().subscribe(
      () => {},
      (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(errorMessage);
      }
    );

    // Simulate an HTTP error response
    const req = httpMock.expectOne(service['dataUrl']);
    req.flush({}, { status: 500, statusText: 'Server Error' });
  });
});
