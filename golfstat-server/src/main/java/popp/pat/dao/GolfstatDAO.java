package popp.pat.dao;

import org.apache.ibatis.session.SqlSession;

import popp.pat.SQLiteDriverConnection;
import popp.pat.model.Stats;

public class GolfstatDAO {

	public static Stats getStats() {
		Stats stats = null;
		SqlSession session = null;
		try {
			session = SQLiteDriverConnection.getSession().openSession();
		    Integer numberOfGolfers = session.selectOne("golfstat.getNumberOfGolfers");
		    Integer numberOfCourses = session.selectOne("golfstat.getNumberOfCourses");
		    
			stats = new Stats();
			stats.setNumberOfCourses(numberOfCourses);
			stats.setNumberOfPlayers(numberOfGolfers);
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
}
