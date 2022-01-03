import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Posts } from './post.interface';

import { AppService } from './app.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('AppService', () => {
  let service: AppService, httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });

    service = TestBed.get(AppService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service is truty', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers: Posts[] = [
        {
          userId: 10,
          id: 10,
          title: 'post',
          body: 'post',
        },
      ];
      service.getData().subscribe((users) => {
        expect(users.length).toBe(1);
        expect(users).toEqual(dummyUsers);
      });
      const req = httpMock.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });

    it('throws 404 error', () => {
      service.getData().subscribe(
        (users) => {
          fail('Should have failed with 404 error');
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
      const req = httpMock.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });
});
