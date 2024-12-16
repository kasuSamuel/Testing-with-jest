import { MockResponseInit } from './../../../node_modules/jest-fetch-mock/types/index.d';
import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';




describe('DataServiceService', () => {
  let service: DataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServiceService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  

  it('should fetch quiz data', async () => {
fetchMock.mockResponseOnce(JSON.stringify({
  "quizzes": [
    {
      "title": "Math",
      "questions": [
        {
          "question": "2 + 2",
          "options": [
            "4",
            "5",
            "6",
            "7"
          ],
          "answer": "4"
        }
      ]
    }
  ]
}))
  });
  
});
