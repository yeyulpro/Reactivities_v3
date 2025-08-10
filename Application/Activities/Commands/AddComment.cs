using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
	public class AddComment
	{
		public class Command : IRequest<Result<CommentDto>>
		{
			public required string Body{ get; set; }
			public required string ActivityId{ get; set; }
		}

        public class Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<CommentDto>>
        {
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
               var user = await userAccessor.GetUserAsync();

				var activity = await context.Activities
								.Include(x => x.Comments)
								.ThenInclude(x => x.User)
								.FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);
				if (activity == null) return Result<CommentDto>.Failure("Could not find activity", 404);

				var comment = new Comment
				{
					UserId = user.Id,
					ActivityId = activity.Id,
					Body = request.Body
				};

				context.Comments.Add(comment);

				var result = await context.SaveChangesAsync(cancellationToken) > 0;
				return result ? Result<CommentDto>.Success(mapper.Map<CommentDto>(comment))
								: Result<CommentDto>.Failure("Failed to save a comment", 404);

            }
        }


    }
}
