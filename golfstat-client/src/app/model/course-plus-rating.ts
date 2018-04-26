import { Course } from './course';
import { CourseRating } from './course-rating';
import { Hole } from './hole';

export class CoursePlusRating {
  course: Course;
  ratings: CourseRating[];
  holes: Hole[];
}
