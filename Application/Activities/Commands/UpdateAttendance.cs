﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        public class CommandHandler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                               .Include(x => x.Attendees)
                               .ThenInclude(x => x.User)                                                            //선택된 activity를 db에서 갖고옴
                               .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

                var user = await userAccessor.GetUserAsync();//login 사용자
                var attendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);
                var isHost = activity.Attendees.Any(x => x.IsHost && x.UserId == user.Id);

                if (attendance != null)
                {
                    if (isHost) activity.isCancelled = !activity.isCancelled;
                    else activity.Attendees.Remove(attendance);
                }
                else
                {
                    activity.Attendees.Add(new ActivityAttendee
                    {
                        UserId = user.Id,
                        ActivityId = activity.Id,
                        IsHost = false
                    });
                }
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating the DB", 400);
            }
        }
    }
}