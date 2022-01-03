import {ComponentFixture, TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {AuthGreeter} from './auth-greeter.component';
import {By} from '@angular/platform-browser';
import {AuthService} from './auth.service';

/* 
  Usage:     <auth-greeter></auth-greeter> 
  Renders:   <h1>Hello Spiderman!</h1>
*/
describe('Component: AuthGreeter', () => {
  let fixture, greeter, element, de, auth, auth2;
  
  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthGreeter ],
      providers: [ AuthService ]
    });

    fixture = TestBed.createComponent(AuthGreeter);
    greeter = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;

    auth = TestBed.get(AuthService); 
    auth2 = de.injector.get(AuthService);
  });
  
  //specs
  it('instances should be different', () => {
    expect(auth).not.toBe(auth2);
  });

  it('should render `Hello Spiderman!` (async)', async(() => {
    //trigger change detection
    fixture.detectChanges();
    fixture.whenStable().then(() => { 
      expect(element.querySelector('h1').innerText).toBe('Hello Spiderman!');
    });
  }));
}) 