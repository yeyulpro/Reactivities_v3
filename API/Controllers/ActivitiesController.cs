using System.ComponentModel.DataAnnotations;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
using Application.DTOs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using Persistence;
using SQLitePCL;


namespace API.Controllers
{

	public class ActivitiesController(IMediator mediator) : BaseApiController
	{

		[HttpGet]
		public async Task<ActionResult<PagedList<ActivityDto, DateTime?>>> GetActivities([FromQuery]ActivityParams activityParams)
		                                                    //특정 클라이언트가 너무 큰 pageSize를 요청해 서버를 공격하는 것을 막으려고 일부러 API에 pageSize 파라미터를 빼고,서버에서 고정값 또는 내부 정책으로 페이지 크기를 정하는 경우도 있어요.
		{
			return HandleResult(await mediator.Send(new GetActivityList.Query{Params=activityParams}));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ActivityDto>> GetActivityDetails(string id)
		{


			return HandleResult(await mediator.Send(new GetActivityDetails.Query { Id = id }));

		}

		[HttpPost]
		public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
		{
			return HandleResult(await mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));

		}
		[HttpPut("{id}")]
		[Authorize(Policy = "IsActivityHost")]
		public async Task<ActionResult<Activity>> UpdateActivity(string id, EditActivityDto activity)
		{
			activity.Id = id;
			return HandleResult(await mediator.Send(new EditActivity.Command { ActivityDto = activity }));

		}
		[HttpDelete("{id}")]
		[Authorize(Policy = "IsActivityHost")]
		public async Task<ActionResult> DeleteActivity(string id)
		{
			return HandleResult(await mediator.Send(new DeleteActivity.Command { Id = id }));

		}

		[HttpPost("{id}/attend")]
		public async Task<ActionResult> Attend(string id)
		{
			return HandleResult(await mediator.Send(new UpdateAttendance.Command { Id = id }));
		}
	}
}
