using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
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
		public async Task<ActionResult<Result<Activity>>> GetActivityDetails(string id)
		{
			

			var result = await mediator.Send(new GetActivityDetails.Query { Id = id });
			if (!result.IsSuccess && result.Code == 404) return NotFound();
			if (result.IsSuccess && result.Value != null) return Ok(result.Value);
			return BadRequest(result.Error);
			
			
			
		}

		[HttpPost]
		public async Task<ActionResult<Result<string>>> CreateActivity(CreateActivityDto activityDto)
		{
		var result =await mediator.Send(new CreateActivity.Command { ActivityDto = activityDto });	
			if (!result.IsSuccess && result.Code == 404) return NotFound();
			if (result.IsSuccess && result.Value != null) return Ok(result.Value);
			return BadRequest(result.Error);
		}
		[HttpPut]
		public async Task<ActionResult<Result<Activity>>> UpdateActivity(EditActivityDto activity)
		{
			var result =await mediator.Send(new EditActivity.Command { ActivityDto= activity });
			if (!result.IsSuccess && result.Code == 404) return NotFound();
			if (result.IsSuccess) return Ok(result.Value);
			
			return  BadRequest(result.Error);
		}
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteActivity(string id)
		{
			var result =await mediator.Send(new DeleteActivity.Command { Id = id });
			if (!result.IsSuccess && result.Code == 404) return NotFound();
			if (result.IsSuccess ) return Ok(result.Value);
			return  BadRequest(result.Error);
		}
	}
}
