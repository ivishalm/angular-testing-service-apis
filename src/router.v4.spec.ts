import {TestBed, async, fakeAsync, tick, inject} from '@angular/core/testing';
import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Router, RouterModule, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';

@Component({
  template: `<router-outlet></router-outlet>`
})
class TestComponent { }

@Component({
  template: `<h1>Home</h1>`
})
export class Home { }

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: '**', redirectTo: 'home' }
];

describe('Router tests', () => {
  let router, location, fixture;
  
  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ 
        Home,
        TestComponent
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });
  
  it('default route redirects to home (async)', async(() => {
    router.initialNavigation(); // triggers default
    fixture.detectChanges();
    fixture.whenStable().then(() => { 
      expect(location.path()).toBe('/home');
    })
  }));
  it('can navigate to home (fakeAsync/tick)', fakeAsync(() => {
    router.navigate(['/home']);
    fixture.detectChanges();
    //execute all pending asynchronous calls
    tick();    
    expect(location.path()).toBe('/home');
  }));
  it('should redirect unexisting urls to Home (fakeAsync/tick)', fakeAsync(() => {
    router.navigate(['/undefined/route']);
    fixture.detectChanges();
    //execute all pending asynchronous calls
    tick();     
    expect(location.path()).toBe('/home');
  })); 
});