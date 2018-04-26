import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import { StatsService } from '../stats.service';
import { CoursePlusRating } from '../model/course-plus-rating';
import { Course } from '../model/course';
import { CourseRating } from '../model/course-rating';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursePlusRatings: CoursePlusRating[];
  newCourseName: string;
  newCourseTees: string;
  newCourseMensSlope: number;
  newCourseMensRating: number;
  newCourseWomensSlope: number;
  newCourseWomensRating: number;
  newCoursePlusRatings: CoursePlusRating;

  constructor(
    private statsService: StatsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCourses();
    this.emptyNewCourseInput();
  }

  emptyNewCourseInput() {
    this.newCourseName = "";
    this.newCourseTees = "";
    this.newCourseMensSlope = undefined;
    this.newCourseMensRating = undefined;
    this.newCourseWomensSlope = undefined;
    this.newCourseWomensRating = undefined;
  }

  getCourses() {
    this.statsService.getCourses().subscribe(
      data => {
        console.log(data);
        this.coursePlusRatings = data;
        console.log(this.coursePlusRatings);
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

  addCourse() {
    if(this.newCourseName === "" || this.newCourseTees === "" ||
       this.newCourseMensSlope === undefined || this.newCourseMensRating === undefined) {
      this.messageService.add({severity:'warn', summary:'Add Course', detail:"Course name, tees, slope and rating all need values"});
      return;
    }

    this.newCoursePlusRatings = new CoursePlusRating();

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
