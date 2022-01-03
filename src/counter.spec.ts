import {inject, TestBed} from '@angular/core/testing';
import {Counter} from './counter';
import {async, fakeAsync, tick} from '@angular/core/testing';

/* 
  Usage: <counter (changes)="log($event)"></counter> 
         log($event) { console.log($event) }
*/

describe('EventEmitter: Counter', () => {
  let counter;
  
  //setup
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ Counter ]
  }));
  
  beforeEach(inject([Counter], c => {
    counter = c;
  }))
  
  //specs
  it('should increment +1 (async)', async(() => {
    counter.changes.subscribe(x => { 
      expect(x).toBe(1);
    });
    counter.change(1);
  }));

  it('should decrement -1 (async)', async(() => {
    counter.changes.subscribe(x => { 
      expect(x).toBe(-1);
    });
    counter.change(-1);
  }));

  it('should increment +1 (fakeAsync/tick)', fakeAsync(() => {
    counter.changes.subscribe(x => { 
      expect(x).toBe(1);
    });
    counter.change(1);
    //execute all pending asynchronous calls
    tick();
  }));

  it('should decrement -1 (fakeAsync/tick)', fakeAsync(() => {
    counter.changes.subscribe(x => { 
      expect(x).toBe(-1);
    });
    counter.change(-1);
    //execute all pending asynchronous calls
    tick();
  }));
  
  it('should increment +1 (done)', done => {
    counter.changes.subscribe(x => { 
      expect(x).toBe(1);
      done();
    });
    counter.change(1);
  });

  it('should decrement -1 (done)', done => {
    counter.changes.subscribe(x => { 
      expect(x).toBe(-1);
      done();
    });
    counter.change(-1);
  });  
}) 