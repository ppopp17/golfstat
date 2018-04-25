package popp.pat.dao;

import java.util.List;

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
}
