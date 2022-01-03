import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() { }

  get username() {
    return "Spiderman";
  }

}