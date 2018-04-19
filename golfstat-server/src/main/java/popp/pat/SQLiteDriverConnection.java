package popp.pat;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLiteDriverConnection {
	private static Connection conn;
	
	public static Connection getConnection() {
		if(conn == null) {
			try {
				String url = "jdbc:sqlite:C:/Users/ppopp.UTCDA/Google Drive/Home/golfScored.db3";
				
				conn = DriverManager.getConnection(url);
				
				System.out.println("Connection has been established");
			}
			catch(SQLException e) {
				System.out.println(e.getMessage());
				System.exit(1);
			}
		}
		return conn;
		/*finally {
			try {
				if(conn != null) {
					conn.close();
				}
			}
			catch (SQLException e) {
				System.out.println(e.getMessage());
			}
		}*/
	}

}
