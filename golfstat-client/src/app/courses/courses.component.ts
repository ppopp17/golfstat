import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import { StatsService } from '../stats.service';
import { CoursePlusRatings } from '../model/course-plus-ratings';
import { Course } from '../model/course';
import { CourseRating } from '../model/course-rating';
import { Hole } from '../model/hole';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursePlusRatings: CoursePlusRatings[];
  newCourseName: string;
  newCourseTees: string;
  newCourseMensSlope: number;
  newCourseMensRating: number;
  newCourseWomensSlope: number;
  newCourseWomensRating: number;
  newCoursePlusRatings: CoursePlusRatings;
  showButtonText: string[];
  showTable: boolean[];
  selectedLength: string;
  newHoles: Hole[];

  constructor(
    private statsService: StatsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCourses();
    this.emptyNewCourseInput();
    this.selectedLength = "9";
  }

  emptyNewCourseInput() {
    this.newCourseName = "";
    this.newCourseTees = "";
    this.newCourseMensSlope = undefined;
    this.newCourseMensRating = undefined;
    this.newCourseWomensSlope = undefined;
    this.newCourseWomensRating = undefined;
    this.newHoles = new Array();
    for(let i=1; i<19; i++) {
      let h = new Hole();
      h.number = i;
      this.newHoles.push(h);
    }
  }

  getCourses() {
    this.statsService.getCoursesPlusRatings().subscribe(
      data => {
        console.log(data);
        this.coursePlusRatings = data;
        console.log("Courses: "+this.coursePlusRatings);
        console.log("Courses length: "+this.coursePlusRatings.length);
        this.showButtonText = new Array();
        this.showTable = new Array();
        for(let i=0; i<this.coursePlusRatings.length; i++) {
          this.showButtonText.push("Show");
          this.showTable.push(false);
        }
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

  toggle(id: number) {
      console.log("toggle id="+id);
      this.showTable[id] = !this.showTable[id];
      if(this.showTable[id]) {
        this.showButtonText[id] = "Hide";
      }
      else {
        this.showButtonText[id] = "Show";
      }
  }

  addCourse() {
    if(this.newCourseName === "" || this.newCourseTees === "" ||
       this.newCourseMensSlope === undefined || this.newCourseMensRating === undefined) {
      this.messageService.add({severity:'warn', summary:'Add Course', detail:"Course name, tees, slope and rating all need values"});
      return;
    }
    let length = 9;
    if(this.selectedLength === "18") {
      length = 18;
    }
    for(let i=0; i<length; i++) {
      if(this.newHoles[i].par === undefined || this.newHoles[i].length === undefined) {
        this.messageService.add({severity:'warn', summary:'Add Course', detail:"Hole par and length all need values"});
        return;
      }
    }

    this.newCoursePlusRatings = new CoursePlusRatings();

    // add new Course info
    var newCourse = new Course();
    newCourse.name = this.newCourseName;
    newCourse.tees = this.newCourseTees;
    this.newCoursePlusRatings.course = newCourse;

    // add new ratings
    if(this.newCourseWomensSlope === undefined || this.newCourseWomensRating === undefined) {
      // only one slope / rating entered; add only one rating object
      var rating = new CourseRating();
      rating.gender = "both";
      rating.slope = this.newCourseMensSlope;
      rating.rating = this.newCourseMensRating;
      this.newCoursePlusRatings.ratings = [rating];
    }
    else {
      // men and women slope / rating defined; add them both
      var menRating = new CourseRating();
      menRating.gender = "men";
      menRating.slope = this.newCourseMensSlope;
      menRating.rating = this.newCourseMensRating;

      var womenRating = new CourseRating();
      womenRating.gender = "women";
      womenRating.slope = this.newCourseWomensSlope;
      womenRating.rating = this.newCourseWomensRating;

      this.newCoursePlusRatings.ratings = [menRating, womenRating];
    }
    console.log(this.newCoursePlusRatings);

    // add holes
    if(this.selectedLength === "9") {
      this.newCoursePlusRatings.holes = this.newHoles.slice(0,9);
    }
    else {
      this.newCoursePlusRatings.holes = this.newHoles.slice(0);
    }

    this.statsService.addNewCourse(this.newCoursePlusRatings).subscribe(
      data => {
        console.log("New course added, refreshing course list");
        this.emptyNewCourseInput();
        this.getCourses();
      },
      err => {
        console.error(err);
        this.messageService.add({severity:'error', summary:'Save New Course Error', detail:err.message});
      },
      () => {
        //console.log('done loading nav tree');
      }
    );
  }
}
