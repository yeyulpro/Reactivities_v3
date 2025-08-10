using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController(IMediator mediator) : BaseApiController
    {
        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
        {
            return HandleResult(await mediator.Send(new AddPhoto.Command { File = file }));
        }

        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<List<Photo>>> GetPhotosForUser(string userId)
        {
            return HandleResult(await mediator.Send(new GetProfilePhotos.Query { UserId = userId }));
        }

        [HttpDelete("{photoId}/photos")]
        public async Task<ActionResult<List<Photo>>> DeletePhoto(string photoId)
        {
            return HandleResult(await mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
        }

        [HttpPut("{photoId}/setMain")]
        public async Task<ActionResult> SetMainPhoto(string photoId)
        {
            return HandleResult(await mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfile>> GetProfile(string userId)
        {
            return HandleResult(await mediator.Send(new GetProfile.Query { UserId = userId }));
        }
        [HttpPost("{userId}/follow")]
        public async Task<ActionResult> FollowToggle(string userId)
        {
            return HandleResult(await mediator.Send(new FollowToggle.Command { TargetUserId = userId }));
        }

          [HttpGet("{userId}/follow-list")]
        public async Task<ActionResult<List<UserProfile>>> GetFollowings(string userId, string predicate)// userId는 route parameter, predicate은  query string.
        {                                           //ASP.NET Core에서 parameter가 route에 없으면 자동으로 query string에서 바인딩됩니다
            return HandleResult(await mediator.Send(new GetFollowings.Query { UserId =  userId, Predicate = predicate }));
        }  
    }
}