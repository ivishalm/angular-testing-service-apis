import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
const URL = 'https://gist.githubusercontent.com/gsans/09c246281b92c014d691c4aa6a223e73/raw/ee4c65c31a70e845723d213de5493600000d8ba5/languages.json';

@Injectable()
export class LanguagesServiceHttp {
  constructor(private http:Http) { }
  
  get(){
    return this.http.get(URL) // ../api/languages.json
      .map(response => response.json()); 
  }
}