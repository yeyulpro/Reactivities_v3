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
	public class CreateActivity
	{
		public class Command : IRequest<string>
		{
			public required Activity NewActivity { get; set; }
		}

		public class CommandHandler(AppDbContext context) : IRequestHandler<Command, string>
		{

			public async Task<string> Handle(Command request, CancellationToken cancellationToken)
			{
				
				 context.Activities.Add(request.NewActivity);
				await context.SaveChangesAsync(cancellationToken);
				return request.NewActivity.Id;
				
			}
		}

	}
}
