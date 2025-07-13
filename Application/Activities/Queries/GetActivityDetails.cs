using Application.Core;
using Azure.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Queries
{
	public class GetActivityDetails
	{
		public class Query : IRequest<Result<Activity>>
		{
			public required string Id { get; set; }
		}
		public class QueryHandler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
		{
			public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
			{
				var activity =await context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
				if (activity==null) return Result<Activity>.Failure("The Activity is not found.", 404);

				return Result<Activity>.Success(activity);
				
			

			}
		}
	}
}
