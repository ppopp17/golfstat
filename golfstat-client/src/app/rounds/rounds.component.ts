import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
import { StatsService } from '../stats.service';
import { Course } from '../model/course';
import { Round } from '../model/round';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit {
  selectedCourse: Course;
  courses: Course[];
  courseOptions: SelectItem[];
  courseDate: string;

  constructor(
    private statsService: StatsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.statsService.getCourses().subscribe(
      data => {
        console.log(data);
        this.courses = data;
        this.courseOptions = new Array();
        for(let i=0; i<this.courses.length; i++) {
          this.courseOptions.push(
            {label:this.courses[i].name+' '+this.courses[i].tees, value:this.courses[i]}
          )
        }
        this.selectedCourse = this.courses[0];
      },
      err => {
        console.error(err);
        this.messageService.add({severity:'error', summary:'Retrieve Courses', detail:err.message});
      },
      () => {
        console.log('done loading courses');
      }
    );
  }

  addRound() {
    let newRound = new Round();
    newRound.date = this.courseDate;
    newRound.courseId = this.selectedCourse.id;
    this.statsService.addNewRound(newRound).subscribe(
      data => {
        console.log("New round added, refreshing lists");
        this.getCourses();
      },
      err => {
        console.error(err);
        this.messageService.add({severity:'error', summary:'Save New Round Error', detail:err.message});
      },
      () => {
        //console.log('done loading nav tree');
      }
    );
  }
}
