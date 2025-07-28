using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
		public class Query : IRequest<Result<ActivityDto>>
		{
			public required string Id { get; set; }
		}
		public class QueryHandler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<ActivityDto>>
		{
			public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
			{
				var activity = await context.Activities
								.ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
								.FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

				
			
				if (activity==null) return Result<ActivityDto>.Failure("The Activity is not found.", 404);

				return Result<ActivityDto>.Success(activity);
				
			

			}
		}
	}
}
