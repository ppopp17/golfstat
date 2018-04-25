import { Component, OnInit } from '@angular/core';
import { Message, GrowlModule } from 'primeng/primeng';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Popp Golf Stats';
  msgs: Message[] = [];
  items: MenuItem[];

  constructor(
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Admin',
        items: [
          {label: 'Rounds', icon: 'fa-calendar-plus', routerLink: ['/rounds']},
          {label: 'Golfers', icon: 'fa-user', routerLink: ['/golfers']},
          {label: 'Courses', icon: 'fa-golf-ball', routerLink: ['/courses']}
        ]
      },
      {
        label: 'Stats', icon: 'far fa-chart-bar'
      }
    ];
  }
}
