import {inject, TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {LanguagesServiceHttp} from './languagesServiceHttp';

describe('Service: LanguagesServiceHttp', () => {
  let service;
  
  //setup
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpModule ],
    providers: [ LanguagesServiceHttp ]
  }));
  
  beforeEach(inject([LanguagesServiceHttp], s => {
    service = s;
  }));
  
  //specs
  it('should return available languages (async)', async(() => {
    service.get().subscribe(x => { 
      expect(x).toContain('en');
      expect(x).toContain('es');
      expect(x).toContain('fr');
      expect(x.length).toEqual(3);
    });
  }));
  
  // Note: can't use fakeAsync with XHR calls
  it('should return available languages (done)', done => {
    service.get().subscribe(x => { 
      expect(x).toContain('en');
      expect(x).toContain('es');
      expect(x).toContain('fr');
      expect(x.length).toEqual(3);
      done();
    });
  });
}) 