package popp.pat.model;

public class Hole {
	private Long id;
	private Long courseId;
	private Long number;
	private Long par;
	private Long length;
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
	public Long getNumber() {
		return number;
	}
	public void setNumber(Long number) {
		this.number = number;
	}
	public Long getPar() {
		return par;
	}
	public void setPar(Long par) {
		this.par = par;
	}
	public Long getLength() {
		return length;
	}
	public void setLength(Long length) {
		this.length = length;
	}
}
