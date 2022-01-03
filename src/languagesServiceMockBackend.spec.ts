import {inject, TestBed, async} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {LanguagesServiceHttp} from './languagesServiceHttp';


describe('MockBackend: LanguagesServiceHttp', () => {
  let mockbackend, service;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        LanguagesServiceHttp,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
  });
    
  beforeEach(inject([LanguagesServiceHttp, XHRBackend], (_service, _mockbackend) => {
    service = _service;
    mockbackend = _mockbackend;
  }));

  //specs
  it('should return mocked response (async)', async(() => {
    let response = ["ru", "es"];
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      })));
    });
    service.get().subscribe(languages => {
      expect(languages).toContain('ru');
      expect(languages).toContain('es');
      expect(languages.length).toBe(2);
    });
  }));  

  // Note: can't use fakeAsync with XHR calls
  it('should return mocked response (done)', done => {
    let response = ["ru", "es"];
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response({body: JSON.stringify(response)}));
    });
    service.get().subscribe(languages => {
      expect(languages).toContain('ru');
      expect(languages).toContain('es');
      expect(languages.length).toBe(2);
      done();
    });
  });
})