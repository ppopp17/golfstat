import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
import { StatsService } from '../stats.service';
import { Score } from '../model/score';
import { Hole } from '../model/hole';
import { RoundAndCourse } from '../model/round-and-course';
import { Round } from '../model/round';
import { Course } from '../model/course';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  selectedLength: string;
  newScores: Score[];
  holes: Hole[];
  selectedRound: Round;
  rounds: RoundAndCourse[];
  roundOptions: SelectItem[];

  constructor(
    private statsService: StatsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCourses();
    this.newScores = new Array();
    for(let i=0; i<18; i++) {
      let score = new Score();
      this.newScores.push(score);
    }
  }

  getCourses() {
    this.statsService.getRounds().subscribe(
      data => {
        console.log(data);
        this.rounds = data;
        this.roundOptions = new Array();
        for(let i=0; i<this.rounds.length; i++) {
          this.roundOptions.push(
            {label:this.rounds[i].round.date+' '+this.rounds[i].coursePlusRatings.course.name, value:this.rounds[i]}
          )
        }
        this.selectedLength = "front 9";
        this.holes=this.rounds[0].coursePlusRatings.holes.splice(0,9);
        console.log("holes: "+this.holes);
      },
      err => {
        console.error(err);
        this.messageService.add({severity:'error', summary:'Retrieve Rounds', detail:err.message});
      },
      () => {
        console.log('done loading rounds and courses');
      }
    );
  }

  courseChanged(value) {
    console.log(value);
    this.holes=value.coursePlusRatings.holes.splice(0,9);
  }

  lengthChange() {
    console.log("Length changed: "+this.selectedLength);
  }
  
  addScores() {

  }
}
