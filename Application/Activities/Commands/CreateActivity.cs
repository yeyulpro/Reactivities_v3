using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
	public class CreateActivity
	{
		public class Command : IRequest<Result<string>>
		{
			public required CreateActivityDto ActivityDto { get; set; }
		}

		public class CommandHandler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
		{
			public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await userAccessor.GetUserAsync();

				var activity = mapper.Map<Activity>(request.ActivityDto);
				context.Activities.Add(activity);

				var attendee = new ActivityAttendee
				{
					ActivityId = activity.Id,
					UserId = user.Id,
					IsHost = true,
				};
				activity.Attendees.Add(attendee);
				// 이 사용자를 활동의 참석자로 등록한다.;Activity 객체가 자신의 Attendees 목록에 새로운 참석자를 추가
				var result = await context.SaveChangesAsync(cancellationToken) > 0;
				if (!result) return Result<string>.Failure("New Activity Not Saved.", 404);
				return Result<string>.Success(activity.Id);

			}
		}

	}
}
