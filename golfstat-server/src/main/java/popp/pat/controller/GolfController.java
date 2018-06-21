package popp.pat.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import popp.pat.dao.GolfstatDAO;
import popp.pat.model.Course;
import popp.pat.model.CoursePlusRatings;
import popp.pat.model.Golfer;
import popp.pat.model.Round;
import popp.pat.model.RoundAndCourse;
import popp.pat.model.Score;
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
	
	@GET
	@Path("/getGolfersNotInRound/{roundId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Golfer> getGolfersNotInRound(@PathParam("roundId") Integer roundId) {
		List<Golfer> golfers = GolfstatDAO.getGolfersNotInRound(roundId);
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
	public List<Course> getCourses() {
		List<Course> course = GolfstatDAO.getAllCourses();
		if(course == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return course;
	}

	@GET
	@Path("/getCoursesPlusRatings")
	@Produces(MediaType.APPLICATION_JSON)
	public List<CoursePlusRatings> getCoursesPlusRatings() {
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

	@GET
	@Path("/getAllRounds")
	@Produces(MediaType.APPLICATION_JSON)
	public List<RoundAndCourse> getAllRoundsAndCourses() {
		List<RoundAndCourse> rounds = GolfstatDAO.getAllRounds();
		if(rounds == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return rounds;
	}
	
	@POST
	@Path("/addNewRound")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Round addNewRound(Round round) {
		Round newRound = GolfstatDAO.addNewRound(round);
		if(newRound == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return newRound;
	}

	@POST
	@Path("/addNewScores")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Score> addNewScores(List<Score> scores) {
		List<Score> newScores = GolfstatDAO.addNewScores(scores);
		if(newScores == null) {
			Response response = Response.serverError().entity("Some DB error").build();
			throw new WebApplicationException(response);
		}
		return newScores;
	}
}
