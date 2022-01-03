import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { Posts } from './post.interface';
import { Observable } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>,
    component: AppComponent,
    service: AppService,
    el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AppComponent],
      providers: [{ provide: AppService, useClass: MockAppService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AppService);
    el = fixture.nativeElement;
  }));

  describe('AppComponent onit test', () => {
    it('intial list item', async(() => {
      let liCount = fixture.debugElement.queryAll(By.css('li'));
      expect(liCount.length).toBe(0);
    }));

    it('should called appService getData method', async(() => {
      spyOn(service, 'getData').and.callThrough();
      fixture.detectChanges();
      expect(service.getData).toHaveBeenCalled();
    }));

    it('should return an Observable<User[]>', () => {
      const dummyUsers = [
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
        fixture.detectChanges();
        let liCount = fixture.debugElement.queryAll(By.css('li'));
        expect(liCount.length).toBe(1);
      });
    });
  });
});

const mockPosts: Posts[] = [
  {
    userId: 10,
    id: 10,
    title: 'post',
    body: 'post',
  },
];

export class MockAppService extends AppService {
  getData() {
    return Observable.of(mockPosts);
  }
}
