import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'auth-greeter',   // <auth-greeter></auth-greeter>
  template: `<h1>Hello {{name}}!</h1>`,
  providers: [ AuthService ]
})
export class AuthGreeter implements OnInit { 
  @Input() name;
  constructor(public auth: AuthService) { }
  
  ngOnInit() {
    if (!this.name) {
      this.name = this.auth.username;
    }
  } 
}