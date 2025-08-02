using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands
{
    public class SetMainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string PhotoId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor)
         : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
                if (photo == null) return Result<Unit>.Failure("cannot find photo", 400);
                user.ImageUrl = photo.Url;

                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                //만약  user.ImageUrl = photo.Url; 기존에 선택한  사진 이미지가 프로파일 이미지였다면 result ==0 일것이고 false로 갈것이다.
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating photo", 400);

                //await는 GetUserWithPhotosAsync()처럼 Task를 반환하는 메서드에서 사용해야 하고,
                //user.Photos.FirstOrDefault(...)는 그냥 동기 메서드라 async나 await 없이 써야 합니다.
                //는 이미 메모리에 로딩된 컬렉션에서 찾는 것이기 때문에 비동기일 필요가 없습니다

            }
        }
    }
}