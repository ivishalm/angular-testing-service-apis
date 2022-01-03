import {inject, TestBed, async} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {LanguagesServiceHttpClient} from './languages.service.HttpClient';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const URL = 'https://gist.githubusercontent.com/gsans/a85f14f67836840d11cf96459d6c4216/raw/03ebe48e649a6491b5f94d861301035669e5621d/users.json'

describe('Service: LanguagesServiceHttpClient', () => {
  let service, httpMock;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ LanguagesServiceHttpClient ]
  }));

  beforeEach(inject([LanguagesServiceHttpClient, HttpTestingController], (s, h) => {
    service = s;
    httpMock = h;
  }));

  //specs
  it('should return available users', done => {
    const USERS = [
      {
        "id": 34,
        "username": "spiderman",
        "roles": ["admin", "user"], 
        "superuser": true
      }, 
      {
        "id": 67,
        "username": "batman",
        "roles": ["user"]
      }
    ];
    
    service.get()
      .subscribe({
        next: res => {
          expect(res).toBe(USERS);
          expect(res.length).toEqual(2);
          done();
        }
      });
    httpMock.expectOne(URL)
      .flush(USERS);
    httpMock.verify();
  });
    
})