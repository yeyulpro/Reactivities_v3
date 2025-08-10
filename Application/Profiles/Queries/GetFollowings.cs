using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries
{
    public class GetFollowings
    {
        public class Query : IRequest<Result<List<UserProfile>>>
        {
            public string Predicate { get; set; } = "followers";
            public required string UserId { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<UserProfile>>>{
            public async Task<Result<List<UserProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<UserProfile>();
                     
                switch (request.Predicate)
                {
                    case "followers":  // request.userId가 나일땐 나의 팔로우들이나 혹은 내가 팔로우하는 한석규의 전체 추종자들를 보고싶을때, 한석규의 팔로우어들
                        profiles = await context.UserFollowings.Where(x => x.FollowingId == request.UserId)
                        .Select(x => x.Follower)
                        .ProjectTo<UserProfile>(mapper.ConfigurationProvider,  new{currentUserId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                        break;
                    case "followings":  //request.UserId가 친구신청한 사람들의 목록, ? 내가 신청한 친구들의 목록도
                        profiles = await context.UserFollowings.Where(x => x.FollowerId == request.UserId)
                        .Select(x => x.Following)
                        .ProjectTo<UserProfile>(mapper.ConfigurationProvider,  new{currentUserId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                        break;
                }

                
                return Result<List<UserProfile>>.Success(profiles);
            }
        }
    }
}