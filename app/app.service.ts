import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Posts} from './post.interface';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {

  }

  public getData(): Observable<Posts[]> {
    return this.http.get<Posts[]>('https://jsonplaceholder.typicode.com/posts');
  }
}
