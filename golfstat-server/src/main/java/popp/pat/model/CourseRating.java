package popp.pat.model;

public class CourseRating {
	Long id;
	Long courseId;
	String gender;
	Float slope;
	Float rating;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCourseId() {
		return courseId;
	}
	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Float getSlope() {
		return slope;
	}
	public void setSlope(Float slope) {
		this.slope = slope;
	}
	public Float getRating() {
		return rating;
	}
	public void setRating(Float rating) {
		this.rating = rating;
	}
}
