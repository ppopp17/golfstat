package popp.pat.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import popp.pat.SQLiteDriverConnection;
import popp.pat.model.*;

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

	public static List<Round> getAllRounds() {
		List<Round> rounds = null;
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
			rounds = session.selectList("round.selectAllRounds");
		}
		catch(Exception e) {
			System.out.print(e.getMessage());
		}
		finally {
            if (session != null) {
                session.close();
            }
        }

		return rounds;
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
	
	public static List<CoursePlusRatings> getAllCoursesWithRatings() {
		List<CoursePlusRatings> coursePlusRatings = new ArrayList<CoursePlusRatings>();
		List<Course> courses = getAllCourses();
		for(Course course : courses) {
			CoursePlusRatings cpr = new CoursePlusRatings();
			cpr.setCourse(course);
			cpr.setRatings(getAllCourseRatings(course.getId()));
			coursePlusRatings.add(cpr);
		}

		return coursePlusRatings;
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
}
