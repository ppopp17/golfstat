package popp.pat.model;

public class Round {
	Long id;
	String date;
	Long courseId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Long getCourse() {
		return courseId;
	}
	public void setCourse(Long courseId) {
		this.courseId = courseId;
	}
}
