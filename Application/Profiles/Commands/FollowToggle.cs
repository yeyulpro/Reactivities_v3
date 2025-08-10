using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Azure.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string TargetUserId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var followingUser = await userAccessor.GetUserAsync();
                var target = await context.Users.FindAsync(request.TargetUserId, cancellationToken);

                if (target == null) return Result<Unit>.Failure("Target User is not found.", 400);

                var following = await context.UserFollowings.FindAsync([target.Id,followingUser.Id], cancellationToken);

             
                //FindAsync 는 기본기-primary key를 이용해서 record를 빠르게 찾는데 사용.  키가 하나면 FindAsync("abc123"), 여러개면 배열형식으로 넣는다.
                //new object[] { followingUser.Id, target.Id }원래 이런표현을 c#12부터  [followingUser, target.Id] 이렇게 사용해도 됨. 둘 같은 표현
                // var a = new[] { 1, 2, 3 }; var b = [1, 2, 3]; // C# 12부터 OK
                if (following == null)
                {
                    context.UserFollowings.Add(new Domain.UserFollowing
                    {
                        FollowingId = target.Id,
                        FollowerId = followingUser.Id

                    });
                }
                else
                {
                    context.UserFollowings.Remove(following);
                }

                return await context.SaveChangesAsync(cancellationToken)>0
                        ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem Updating following", 400);

            }
        }
    }
}