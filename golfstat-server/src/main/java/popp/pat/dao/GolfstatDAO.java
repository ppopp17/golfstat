package popp.pat.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import popp.pat.SQLiteDriverConnection;
import popp.pat.model.Course;
import popp.pat.model.CoursePlusRatings;
import popp.pat.model.CourseRating;
import popp.pat.model.Golfer;
import popp.pat.model.GolferStats;
import popp.pat.model.Hole;
import popp.pat.model.Round;
import popp.pat.model.RoundAndCourse;
import popp.pat.model.Score;
import popp.pat.model.Stats;

public class GolfstatDAO {

	public static Stats getStats() {
		Stats stats = null;
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
		    Integer numberOfGolfers = session.selectOne("golfstat.getNumberOfGolfers");
		    Integer numberOfCourses = session.selectOne("golfstat.getNumberOfCourses");
		    Integer numberOfRounds = session.selectOne("golfstat.getNumberOfRounds");
		    
			stats = new Stats();
			stats.setNumberOfCourses(numberOfCourses);
			stats.setNumberOfPlayers(numberOfGolfers);
			stats.setNumberOfRounds(numberOfRounds);
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }
		return stats;
		//return null;
	}
	
	public static List<Golfer> getAllGolfers() {
		List<Golfer> golfers = null;
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
			golfers = session.selectList("golfer.selectAllGolfers");
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return golfers;
	}
	
	//getGolfersNotInRound
	public static List<Golfer> getGolfersNotInRound(Integer roundId) {
		List<Golfer> golfers = null;
		SqlSession session = null;
		try {
			Map<String,Integer> params = new HashMap<String,Integer>();
			params.put("roundId", roundId);
			session = SQLiteDriverConnection.getSession().openSession();
			golfers = session.selectList("golfer.selectAllGolfersNotInRound", params);
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return golfers;
	}
	
	public static Golfer addNewGolfer(Golfer newGolfer) {
		Golfer success = null;
		SqlSession session = null;

		try {
			session = SQLiteDriverConnection.getSession().openSession();
			Long nextId = session.selectOne("golfer.selectNextId");
			if(nextId != null) {
				newGolfer.setId(nextId);
				int count = session.insert("golfer.insertNewGolfer", newGolfer);
				if(count == 1) {
					success = newGolfer;
					System.out.println("New golfer added: "+newGolfer.toString());
					session.commit();
				}
			}
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return success;
		
	}

	public static List<RoundAndCourse> getAllRounds() {
		List<RoundAndCourse> roundAndCourses = new ArrayList<RoundAndCourse>();
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
			List<Round> rounds = session.selectList("round.selectAllRounds");
			for(Round round : rounds) {
				CoursePlusRatings coursePlusRatings = getCoursesWithRatingsById(round.getCourseId());
				RoundAndCourse rac = new RoundAndCourse();
				rac.setCoursePlusRatings(coursePlusRatings);
				rac.setRound(round);
				roundAndCourses.add(rac);
			}
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return roundAndCourses;
	}
	
	public static List<Course> getAllCourses() {
		List<Course> course = null;
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
			course = session.selectList("course.selectAllCourses");
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return course;
	}
	
	public static Course getCourseById(Long id) {
		Course course = null;
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
			Map<String,Long> params = new HashMap<String,Long>();
			params.put("id", id);
			course = session.selectOne("course.selectCourseById", params);
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return course;
	}
	
	public static List<CourseRating> getAllCourseRatings(Long courseId) {
		List<CourseRating> courseRatings = null;
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
			Map<String,Long> params = new HashMap<String,Long>();
			params.put("courseId", courseId);
			courseRatings = session.selectList("courseRating.selectAllCourseRatingsByCourseId", params);
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return courseRatings;
	}
	
	public static List<Hole> getAllHoles(Long courseId) {
		List<Hole> holes = null;
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
			Map<String,Long> params = new HashMap<String,Long>();
			params.put("courseId", courseId);
			holes = session.selectList("hole.selectAllHolesByCourseId", params);
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return holes;
	}
	
	public static List<CoursePlusRatings> getAllCoursesWithRatings() {
		List<CoursePlusRatings> coursePlusRatings = new ArrayList<CoursePlusRatings>();
		List<Course> courses = getAllCourses();
		for(Course course : courses) {
			CoursePlusRatings cpr = new CoursePlusRatings();
			cpr.setCourse(course);
			cpr.setRatings(getAllCourseRatings(course.getId()));
			cpr.setHoles(getAllHoles(course.getId()));
			coursePlusRatings.add(cpr);
		}

		return coursePlusRatings;
	}
	
	public static CoursePlusRatings getCoursesWithRatingsById(Long id) {
		CoursePlusRatings cpr = null;
		Course course = getCourseById(id);
		if(course != null) {
			cpr = new CoursePlusRatings();
			cpr.setCourse(course);
			cpr.setRatings(getAllCourseRatings(course.getId()));
			cpr.setHoles(getAllHoles(course.getId()));
		}
		return cpr;
	}
	
	public static CoursePlusRatings addNewCourse(CoursePlusRatings newCoursePlusRatings) {
		CoursePlusRatings success = null;
		SqlSession session = null;

		try {
			session = SQLiteDriverConnection.getSession().openSession();
			Long nextId = session.selectOne("course.selectNextId");
			if(nextId != null) {
				newCoursePlusRatings.getCourse().setId(nextId);
				int count = session.insert("course.insertNewCourse", newCoursePlusRatings.getCourse());
				if(count == 1) {
					
					// add course ratings
					for(CourseRating courseRating : newCoursePlusRatings.getRatings()) {
						nextId = session.selectOne("courseRating.selectNextId");
						if(nextId == null) {
							throw new Exception("was not able to get next courseRating Id");
						}
						courseRating.setId(nextId);
						courseRating.setCourseId(newCoursePlusRatings.getCourse().getId());
						count = session.insert("courseRating.insertNewCourseRating", courseRating);
						if(count != 1) {
							throw new Exception("was not able to insert new courseRating");
						}
					}
					
					// add holes
					for(Hole hole : newCoursePlusRatings.getHoles()) {
						nextId = session.selectOne("hole.selectNextId");
						if(nextId == null) {
							throw new Exception("was not able to get next hole Id");
						}
						hole.setId(nextId);
						hole.setCourseId(newCoursePlusRatings.getCourse().getId());
						count = session.insert("hole.insertNewHole", hole);
						if(count != 1) {
							throw new Exception("was not able to insert new courseRating");
						}
					}
					success = newCoursePlusRatings;
					session.commit();
				}
			}
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return success;
	}
	
	public static List<Score> addNewScores(List<Score> scores) {
		List<Score> success = null;
		SqlSession session = null;

		try {
			session = SQLiteDriverConnection.getSession().openSession();
			for(Score score : scores) {
				Long nextId = session.selectOne("score.selectNextId");
				if(nextId == null) {
					throw new Exception("was not able to get next score Id");
				}
				score.setId(nextId);
				int count = session.insert("score.insertNewScore", score);
				if(count != 1) {
					throw new Exception("was not able to insert new score");
				}
			}
			session.commit();
			success = scores;
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return success;
	}
	
	public static Round addNewRound(Round round) {
		Round success = null;
		SqlSession session = null;

		try {
			session = SQLiteDriverConnection.getSession().openSession();
			Long nextId = session.selectOne("round.selectNextId");
			if(nextId == null) {
				throw new Exception("was not able to get next score Id");
			}
			round.setId(nextId);
			int count = session.insert("round.insertNewRound", round);
			if(count != 1) {
				throw new Exception("was not able to insert new round");
			}
			session.commit();
			success = round;
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return success;
	}
	
	public static List<GolferStats> getPlayerStats(Golfer golfer) {
		List<GolferStats> golferStats = null;
		SqlSession session = null;

		try {
			session = SQLiteDriverConnection.getSession().openSession();
			golferStats = session.selectList("stats.selectGolferStats", golfer);
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return golferStats;
	}
}
