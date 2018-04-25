import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Stats } from '../model/stats';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  stats: Stats;

  constructor(
    private statsService: StatsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
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
        console.log('done loading stats');
      }
    );
  }

}
