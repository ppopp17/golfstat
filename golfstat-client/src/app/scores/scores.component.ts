import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { StatsService } from '../stats.service';
import { Score } from '../model/score';
import { Hole } from '../model/hole';
import { RoundAndCourse } from '../model/round-and-course';
import { Round } from '../model/round';
import { Course } from '../model/course';
import { Golfer } from '../model/golfer';

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
  playerOptions: SelectItem[];
  players: Golfer[];
  selectedPlayer: Golfer;

  constructor(
    private statsService: StatsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.refreshScores();
    this.getCourses();
  }

  refreshScores() {
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
        this.getGolfersNotInSelectedRound(this.selectedRound.round.id);
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

  courseChanged(value: RoundAndCourse) {
    console.log(value);
    this.holes=value.coursePlusRatings.holes.slice(0,9);
    this.selectedLength = "front 9";
    this.getGolfersNotInSelectedRound(value.round.id);
  }

  getGolfersNotInSelectedRound(roundId: number) {
    this.statsService.getGolfersNotInRound(roundId).subscribe(
      data => {
        console.log(data);
        this.players = data;
        this.playerOptions = new Array();
        for(let i=0; i<this.players.length; i++) {
          this.playerOptions.push(
            {label:this.players[i].name, value:this.players[i]}
          )
        }
        this.selectedPlayer = this.players[0];
      },
      err => {
        console.error(err);
        this.messageService.add({severity:'error', summary:'Retrieve Golfers', detail:err.message});
      },
      () => {
        console.log('done loading rounds and courses');
      }
    );
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
    let scores = new Array();
    for(let i=0; i<this.holes.length; i++) {
      if(this.newScores[i].score !== undefined) {
        let s = new Score();
        s.holeId = this.holes[i].id;
        s.golferId = this.selectedPlayer.id;
        s.roundId = this.selectedRound.round.id;
        s.score = this.newScores[i].score;
        if(this.newScores[i].putts !== undefined) {
          s.putts = this.newScores[i].putts;
        }
        if(this.newScores[i].circle !== undefined) {
          s.circle = 1;
        }
        else {
          s.circle = 0;
        }
        scores.push(s);
        console.log(s);
      }
    }
    this.statsService.addScores(scores).subscribe(
      data => {
        console.log("New scores added, refreshing lists");
        this.refreshScores();
        this.getGolfersNotInSelectedRound(this.selectedRound.round.id);
      },
      err => {
        console.error(err);
        this.messageService.add({severity:'error', summary:'Save New Scores Error', detail:err.message});
      },
      () => {
        //console.log('done loading nav tree');
      }
    );
  }
}
