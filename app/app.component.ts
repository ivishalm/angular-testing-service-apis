import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private user: any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getData().subscribe((data) => {
      this.user = data;
    });
  }
}
