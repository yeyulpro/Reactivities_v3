using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using SQLitePCL;


namespace API.Controllers
{

	public class ActivitiesController( IMediator mediator) : BaseApiController
	{
		[HttpGet]
		public async Task<ActionResult<List<Activity>>> GetActivities()
		{
			return await mediator.Send(new GetActivityList.Query());
		}
		[HttpGet("{id}")]
		public async Task<ActionResult<Activity>> GetActivityDetails(string id)
		{
			return await mediator.Send(new GetActivityDetails.Query { Id=id});
		}

		[HttpPost]
		public async Task<ActionResult<string>> CreateActivity(Activity activity)
		{
			return await mediator.Send(new CreateActivity.Command { NewActivity = activity });	
		}
		[HttpPut]
		public async Task<ActionResult> UpdateActivity(Activity activity)
		{
			await mediator.Send(new EditActivity.Command { Activity= activity });
			return NoContent();
		}
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteActivity(string id)
		{
			await mediator.Send(new DeleteActivity.Command { Id = id });
			return NoContent();
		}
	}
}
