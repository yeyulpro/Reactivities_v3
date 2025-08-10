using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands
{
    public class AddPhoto
    {

        public class Command : IRequest<Result<Photo>>
        {
            public required IFormFile File { get; set; }
        }

        public class Handler( IUserAccessor userAccessor, AppDbContext context, IPhotoService photoService)
         : IRequestHandler<Command, Result<Photo>> // my question"? why result is not photoDto-photoUploadedResult. but db entity Photo?
        {
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {

                var uploadResult = await photoService.UploadPhoto(request.File); // cloudinary upload
                
                if (uploadResult == null) return Result<Photo>.Failure("Failed to upload photo", 400);

                var user = await userAccessor.GetUserAsync();// 현재 로그인 사용자

                var photo = new Photo
                {
                    Url = uploadResult.Url,
                    PublicId = uploadResult.PublicId,
                    UserId = user.Id
                };

                user.ImageUrl ??= photo.Url;
                context.Photos.Add(photo);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Photo>.Success(photo) : Result<Photo>.Failure("Problem saving photo to DB ", 400);


               
            }
        }
    }
}