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
  selectedRound: RoundAndCourse;
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
        this.selectedRound = this.rounds[0];
        this.selectedLength = "front 9";
        this.holes=this.rounds[0].coursePlusRatings.holes.slice(0,9);
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
    this.holes=value.coursePlusRatings.holes.slice(0,9);
    this.selectedLength = "front 9";
  }

  lengthChange(value) {
    console.log("Length changed: "+value);
    let start = 0;
    let end = 9;
    if(value === 'front 9') {
      console.log("1");
      this.holes=this.selectedRound.coursePlusRatings.holes.slice(0,9)
      console.log("2 "+this.holes.length);
    }
    else if(value === 'back 9') {
      console.log("3");
      start = 9;
      end = 18;
      this.holes=this.selectedRound.coursePlusRatings.holes.slice(9,18)
      console.log("4 "+this.holes.length);
    }
    else {
      console.log("5");
      start = 0;
      end = 18;
      this.holes=this.selectedRound.coursePlusRatings.holes.slice(0,18)
      console.log("6");
    }
  }

  addScores() {

  }
}
