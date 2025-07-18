﻿using Application.Core;
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
	public class DeleteActivity
	{
		public class Command : IRequest<Result<Unit>>
		{
			public required string Id { get; set; }
		}
		public class CommandHandler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
		{
			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var activity = await context.Activities.FindAsync(request.Id, cancellationToken);
				if (activity == null) return Result<Unit>.Failure("The Activity(for deletion) not Found.", 404);
				context.Remove(activity);
				var result = await context.SaveChangesAsync(cancellationToken) > 0;
				if (!result) return Result<Unit>.Failure("Deletion not successful.", 400);
				 return Result<Unit>.Success(Unit.Value);

			}
		}
	}
}
