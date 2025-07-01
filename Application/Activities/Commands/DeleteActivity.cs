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
		public class Command: IRequest<Unit>
		{
			public required string Id { get; set; }
		}
		public class CommandHandler(AppDbContext context) : IRequestHandler<Command, Unit>
		{
			public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
			{
				var activity = await context.Activities.FindAsync(request.Id, cancellationToken) ?? throw new Exception("Activity not Found.");				
				 context.Activities.Remove(activity);
				await context.SaveChangesAsync(cancellationToken);
				return Unit.Value;
				
			}
		}
	}
}
