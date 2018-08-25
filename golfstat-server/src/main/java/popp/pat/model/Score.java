package popp.pat.model;

public class Score {
	private Long id;
	private Long holeId;
	private Long golferId;
	private Long roundId;
	private Long score;
	private Long putts;
	private Long circle;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getHoleId() {
		return holeId;
	}
	public void setHoleId(Long holeId) {
		this.holeId = holeId;
	}
	public Long getGolferId() {
		return golferId;
	}
	public void setGolferId(Long golferId) {
		this.golferId = golferId;
	}
	public Long getRoundId() {
		return roundId;
	}
	public void setRoundId(Long roundId) {
		this.roundId = roundId;
	}
	public Long getScore() {
		return score;
	}
	public void setScore(Long score) {
		this.score = score;
	}
	public Long getPutts() {
		return putts;
	}
	public void setPutts(Long putts) {
		this.putts = putts;
	}
	public Long getCircle() {
		return circle;
	}
	public void setCircle(Long circle) {
		this.circle = circle;
	}
}
