package popp.pat;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SQLiteDriverConnection {
	private static Connection conn;
	private static SqlSessionFactory sqlSessionFactory;

	public static SqlSessionFactory getSession() {
		if(sqlSessionFactory == null) {
		
			try {
				String resource = "mybatis-config.xml";
				InputStream inputStream = Resources.getResourceAsStream(resource);
				sqlSessionFactory =
				  new SqlSessionFactoryBuilder().build(inputStream);
			}
			catch(Exception e) {
				System.out.println(e.getMessage());
				System.exit(1);
			}
		}
		
		return sqlSessionFactory;
	}

}
