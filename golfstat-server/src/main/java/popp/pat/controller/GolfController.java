package popp.pat.controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.ibatis.session.SqlSession;

import popp.pat.SQLiteDriverConnection;
import popp.pat.dao.GolfstatDAO;
import popp.pat.model.Stats;

@Path("/rest")
public class GolfController {
	@GET
	@Path("/hello")
	public Response getMsg() {
 
		String output = "Hello World!";
		
		return Response.status(200).entity(output).build();
 
	}

	@GET
	@Path("/stats")
	@Produces(MediaType.APPLICATION_JSON)
	public Stats getStats() throws WebApplicationException{
		Stats stats = GolfstatDAO.getStats();
		if(stats == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return stats;
	}

	@GET
	@Path("/getGolfers")
	@Produces(MediaType.APPLICATION_JSON)
	public Stats getGolfers() {
		SQLiteDriverConnection.getSession();
		
		SqlSession session = SQLiteDriverConnection.getSession().openSession();
        Integer numberOfGolfers = session.selectOne("golfstat.getNumberOfGolfers");
        Integer numberOfCourses = session.selectOne("golfstat.getNumberOfCourses");
        
		Stats stats = new Stats();
		stats.setNumberOfCourses(numberOfCourses);
		stats.setNumberOfPlayers(numberOfGolfers);
		return stats;
	}
}
