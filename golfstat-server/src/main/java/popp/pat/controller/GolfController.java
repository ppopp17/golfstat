package popp.pat.controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
	public Stats getStats() {
 
		Stats stats = new Stats();
		stats.setNumberOfCourses(1);
		stats.setNumberOfPlayers(4);
		return stats;
 
	}
}
