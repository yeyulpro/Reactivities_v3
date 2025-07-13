﻿using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
	public class EditActivity
	{
		public class Command: IRequest<Result<Unit>>
		{
			public required EditActivityDto ActivityDto { get; set; }
		}
		public class CommandHandler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
		{
			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var activity = await context.Activities.FindAsync(request.ActivityDto.Id, cancellationToken);
				if (activity == null) return Result<Unit>.Failure("The Id you look for is not found.", 404);
				mapper.Map(request.ActivityDto, activity);
				var result = await context.SaveChangesAsync(cancellationToken) > 0;
				if (!result) return Result<Unit>.Failure("Activity is not updated", 404);
				return Result<Unit>.Success(Unit.Value);
				
			}
		}
	}
}
