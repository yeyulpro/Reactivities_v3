﻿using System.ComponentModel.DataAnnotations;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
			

			return HandleResult(await mediator.Send(new GetActivityDetails.Query { Id = id }));
		
		}

		[HttpPost]
		public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
		{
		return HandleResult(await mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));	
			
		}
		[HttpPut]
		public async Task<ActionResult<Activity>> UpdateActivity(EditActivityDto activity)
		{
			return HandleResult(await mediator.Send(new EditActivity.Command { ActivityDto= activity }));
			
		}
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteActivity(string id)
		{
			return HandleResult(await mediator.Send(new DeleteActivity.Command { Id = id }));
			
		}
	}
}
