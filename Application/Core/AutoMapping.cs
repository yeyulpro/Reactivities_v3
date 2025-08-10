

using Application.Activities.DTOs;
using Application.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;
using Persistence.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
	public class AutoMapping : Profile
	{
		public AutoMapping()
		{
			string? currentUserId = null;
			CreateMap<Activity, Activity>();
			CreateMap<CreateActivityDto, Activity>();
			CreateMap<EditActivityDto, Activity>();
			CreateMap<Activity, ActivityDto>()
				.ForMember(d => d.HostDisplayName,
				o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
				.ForMember(d => d.HostId,
				 o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

			CreateMap<ActivityAttendee, UserProfile>()
				.ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
				.ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
				.ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
				.ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
				.ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followers.Count))
				.ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.User.Followings.Count))
			 	.ForMember(d => d.Following, o => o.MapFrom(s=>s.User.Followers.Any(x => x.Follower.Id == currentUserId)));

			

			CreateMap<User, UserProfile>()
				.ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
				.ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
				 .ForMember(d => d.Following, o => o.MapFrom(s=>s.Followers.Any(x => x.Follower.Id == currentUserId)));
				

			CreateMap<Comment, CommentDto>()
				.ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
				.ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
				.ForMember(d => d.ImageUrl, o => o.MapFrom(o => o.User.ImageUrl));

		}
	}
}
// When mapping from Activity to ActivityDto, most of the properties are mapped automatically because their names match.
// However, the ActivityDto has a property called HostDisplayName, which doesn’t exist in the original Activity entity.
// So we need to tell AutoMapper how to fill that manually using .ForMember.

// The HostDisplayName refers to the name of the user who is hosting the activity.
// But the Activity entity itself doesn’t directly store that name.
// Instead, it has a list of attendees in the Attendees collection.

// Each attendee links to a user, and also has a boolean property called IsHost.
// So what we do is:
// we search the Attendees list to find the first person where IsHost is true.
// Then, from that attendee object, we access the related User entity,
// and from there, we get the DisplayName to assign to HostDisplayName.

// The exclamation mark ! is used because we assume that every activity must have at least one host.
// If this assumption is ever wrong, it could throw a runtime exception —
// so in production code, it’s better to handle it safely.