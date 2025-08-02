using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands
{
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string PhotoId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService)
         : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

                if (photo == null) return Result<Unit>.Failure("cannot find photo", 400);

                if (photo.Url == user.ImageUrl)
                {
                    return Result<Unit>.Failure("Cannot delete main photo", 400);
                }
                await photoService.DeletePhoto(photo.PublicId);

                user.Photos.Remove(photo);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem deleting photo", 400);

                //await는 GetUserWithPhotosAsync()처럼 Task를 반환하는 메서드에서 사용해야 하고,
                //user.Photos.FirstOrDefault(...)는 그냥 동기 메서드라 async나 await 없이 써야 합니다.
                //는 이미 메모리에 로딩된 컬렉션에서 찾는 것이기 때문에 비동기일 필요가 없습니다

            }
        }
    }
}