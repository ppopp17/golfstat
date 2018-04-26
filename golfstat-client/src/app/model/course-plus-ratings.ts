import { Course } from './course';
import { CourseRating } from './course-rating';
import { Hole } from './hole';

export class CoursePlusRatings {
  course: Course;
  ratings: CourseRating[];
  holes: Hole[];
}
