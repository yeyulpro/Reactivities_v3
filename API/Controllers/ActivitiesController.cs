using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using SQLitePCL;

namespace API.Controllers
{

	public class ActivitiesController(AppDbContext context) : BaseApiController
	{
		[HttpGet]
		public async Task<ActionResult<List<Activity>>> GetActivities()
		{
			return await context.Activities.ToListAsync();
		}
	}
}
