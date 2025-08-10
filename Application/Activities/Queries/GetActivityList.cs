using Application.Core;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Queries
{
	public class GetActivityList
	{
		public class Query: IRequest<List<ActivityDto>>// 리턴 타입을 명시해 준거..
		{

		}
		// 요청 타입, 결과 타입.
		public class QueryHandler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<ActivityDto>>
		{
			public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
			{
				
			
				return await context.Activities
							.ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new{currentUserId = userAccessor.GetUserId() })
							.ToListAsync(cancellationToken);
				
			}
		}
	}
}
