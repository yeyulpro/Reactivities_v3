using Application.Core;
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
		public class Query: IRequest<List<Activity>>// 리턴 타입을 명시해 준거..
		{

		}
		// 요청 타입, 결과 타입.
		public class QueryHandler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
		{
			public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
			{

			
				return await context.Activities.ToListAsync(cancellationToken);
				
			}
		}
	}
}
