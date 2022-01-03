import {ComponentFixture, TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {Component} from '@angular/core';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { 
  trigger, transition, state, style, animate 
} from '@angular/animations';


@Component({
  template: `
    <button [@fade]='fade' (click)="toggleFade()">Fade</button>`,
  animations: [ 
    trigger('fade', [
      state('fadeIn', style({ opacity: 1 })),
      state('fadeOut', style({ opacity: 0.1 })),
      transition('fadeIn <=> fadeOut', animate('2000ms linear'))
    ])
  ]
})
export class FadeComponent {
  fade = 'fadeIn';
  toggleFade(){
    this.fade = this.fade === 'fadeIn' ? 'fadeOut' : 'fadeIn';
  }
}

describe('Animations: Fade', () => {
  let fixture, component, element, de;
  
  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule ],
      declarations: [ FadeComponent ]
    });

    fixture = TestBed.createComponent(FadeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
  });
  
  //specs  
  it('should run (fadeOut) animation (fakeAsync/tick)', fakeAsync(() => {
    component.fade = 'fadeOut';
    //trigger change detection
    fixture.detectChanges();
    //execute all pending asynchronous calls
    tick();
    expect(element.querySelector('button').style['opacity']).toBe('0.1');
    expect(de.query(By.css('button')).nativeElement.style['opacity']).toBe('0.1');
  }));

  it('should run (fadeIn) animation (fakeAsync/tick)', fakeAsync(() => {
    component.fade = 'fadeIn';
    //trigger change detection
    fixture.detectChanges();
    //execute all pending asynchronous calls
    tick();
    expect(element.querySelector('button').style['opacity']).toBe('1');
    expect(de.query(By.css('button')).nativeElement.style['opacity']).toBe('1');
  }));

  it('should toggle between (fadeIn/fadeOut) animations (fakeAsync/tick)', fakeAsync(() => {
    // set initial state and styles
    component.fade = 'fadeIn';
    fixture.detectChanges();
    tick();
    expect(element.querySelector('button').style['opacity']).toBe('1');
    expect(de.query(By.css('button')).nativeElement.style['opacity']).toBe('1');
    
    // click on button to trigger toggle
    element.querySelector('button').click();
    fixture.detectChanges();
    tick();
    expect(component.fade).toBe('fadeOut');
    expect(element.querySelector('button').style['opacity']).toBe('0.1');
    expect(de.query(By.css('button')).nativeElement.style['opacity']).toBe('0.1');
  }));
}) 

