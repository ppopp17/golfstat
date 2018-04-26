package popp.pat.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.ibatis.session.SqlSession;

import popp.pat.SQLiteDriverConnection;
import popp.pat.dao.GolfstatDAO;
import popp.pat.model.CoursePlusRatings;
import popp.pat.model.Golfer;
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
	public List<Golfer> getGolfers() {
		List<Golfer> golfers = GolfstatDAO.getAllGolfers();
		if(golfers == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return golfers;
	}

	@POST
	@Path("/addNewGolfers")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Golfer addNewGolfers(Golfer golfer) {
		Golfer newGolfer = GolfstatDAO.addNewGolfer(golfer);
		if(newGolfer == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return newGolfer;
	}
	
	@GET
	@Path("/getCourses")
	@Produces(MediaType.APPLICATION_JSON)
	public List<CoursePlusRatings> getCourses() {
		List<CoursePlusRatings> coursePlusRatings = GolfstatDAO.getAllCoursesWithRatings();
		if(coursePlusRatings == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return coursePlusRatings;
	}

	@POST
	@Path("/addNewCourse")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public CoursePlusRatings addNewCourse(CoursePlusRatings course) {
		CoursePlusRatings newCourse = GolfstatDAO.addNewCourse(course);
		if(newCourse == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return newCourse;
	}
}
