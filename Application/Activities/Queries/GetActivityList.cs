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
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Queries
{
	public class GetActivityList

	
	{

		public class Query : IRequest<Result<PagedList<ActivityDto, DateTime?>>>// 리턴 타입을 명시해 준거..
		{
			public required ActivityParams Params { get; set; }
		}
		// 요청 타입, 결과 타입.
		public class QueryHandler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query,Result<PagedList<ActivityDto, DateTime?>>>
		{
			public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var query = context.Activities
							.OrderBy(x => x.Date)
							.Where(x=>x.Date >=(request.Params.Cursor ?? request.Params.StartDate))
							.AsQueryable();

				if (!string.IsNullOrEmpty(request.Params.Filter))
				{
					query = request.Params.Filter switch
					{
						"isGoing" => query.Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
						"isHost" => query.Where(x=>x.Attendees.Any(a =>a.IsHost && a.UserId == userAccessor.GetUserId())),
						_=> query  //_는 C#에서 discard 패턴 또는 **"어떤 값이든 상관없음"**을 의미해.
					};
				}
			

				var projectedActivities = query.ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() });

				var activities = await projectedActivities
							.Take(request.Params.PageSize + 1)  //다음 페이지 존재 여부 판단용
							.ToListAsync(cancellationToken);

				DateTime? nextCursor = null;  // "더 불러올 다음 페이지가 없다"는 신호입니다.
				if (activities.Count > request.Params.PageSize)//activities는 조회한 활동(Activity) 목록;실제로는 클라이언트가 원하는 개수보다 하나  더 많은 데이터를 조회했다는 뜻
				{                                        //보통 페이지네이션 구현할 때 다음 페이지가 있는지 확인하려고 PageSize + 1 개를 조회해서 하나 더 있는지 보는 용도로 많이 씁니다.
									//왜 하나 더 조회하나? 클라이언트에게는 PageSize 만큼만 보여주고,그보다 하나 더 조회해서 데이터가 더 남아 있는지 확인하는 용도입니다.데이터가 더 있으면 nextCursor를 만들어서 다음 페이지 요청에 대비합니다.
					nextCursor = activities.Last().Date;
					activities.RemoveAt(activities.Count - 1);
				}
				return Result<PagedList<ActivityDto, DateTime?>>.Success(new PagedList<ActivityDto, DateTime?>
				{
					Items = activities,
					NextCursor = nextCursor  // 커서 기반 페이지네이션은 서버가 nextCursor를 주고,클라이언트가 그걸 다음 요청 때 보내면서 이어서 데이터를 받아오는 방식입니다.
				});
				
			}
		}
	}
}
