import { Component, OnInit } from '@angular/core';
import { StatsService } from './stats.service';
import { Stats } from './model/stats';
import { Message, GrowlModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Popp Golf Stats';
  stats: Stats;
  msgs: Message[] = [];

  constructor(
    private statsService: StatsService,
    private messageService: MessageService
    //protected router: Router
  ) { }

  ngOnInit(): void {
    this.statsService.getStats().subscribe(
      data => {
        console.log(data);
        this.stats = data;
      },
      err => {
        console.error(err);
        this.messageService.add({severity:'error', summary:'Retrieve Data Error', detail:err.message});
      },
      () => {
        console.log('done loading nav tree');
      }
    );
  }
}
