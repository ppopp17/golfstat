package popp.pat.model;

import java.util.List;

public class CoursePlusRatings {
	private Course course;
	private List<CourseRating> ratings;
	private List<Hole> holes;
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	public List<CourseRating> getRatings() {
		return ratings;
	}
	public void setRatings(List<CourseRating> ratings) {
		this.ratings = ratings;
	}
	public List<Hole> getHoles() {
		return holes;
	}
	public void setHoles(List<Hole> holes) {
		this.holes = holes;
	}
}
