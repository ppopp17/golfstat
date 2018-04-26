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
          {label: 'Rounds', icon: 'fas fa-calendar-plus', routerLink: ['/rounds']},
          {label: 'Golfers', icon: 'fa-user', routerLink: ['/golfers']},
          {label: 'Courses', icon: 'fas fa-flag', routerLink: ['/courses']},
          {label: 'Scores', icon: 'fa-golf-ball', routerLink: ['/scores']}
        ]
      },
      {
        label: 'Stats', icon: 'fas fa-chart-bar'
      }
    ];
  }
}
