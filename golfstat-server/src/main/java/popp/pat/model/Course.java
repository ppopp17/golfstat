package popp.pat.model;

public class Course {
	Long id;
	String name;
	String tees;
	Float menSlope;
	Float menRating;
	Float womenSlope;
	Float womenRating;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTees() {
		return tees;
	}
	public void setTees(String tees) {
		this.tees = tees;
	}
	public Float getMenSlope() {
		return menSlope;
	}
	public void setMenSlope(Float menSlope) {
		this.menSlope = menSlope;
	}
	public Float getMenRating() {
		return menRating;
	}
	public void setMenRating(Float menRating) {
		this.menRating = menRating;
	}
	public Float getWomenSlope() {
		return womenSlope;
	}
	public void setWomenSlope(Float womenSlope) {
		this.womenSlope = womenSlope;
	}
	public Float getWomenRating() {
		return womenRating;
	}
	public void setWomenRating(Float womenRating) {
		this.womenRating = womenRating;
	}
}
