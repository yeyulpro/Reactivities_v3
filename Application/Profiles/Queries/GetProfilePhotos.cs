using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries
{
    public class GetProfilePhotos
    {
        public class Query : IRequest<Result<List<Photo>>>
        {
            public required string UserId { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Photo>>>
        {
            public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var photos = await context.Users
                            .Where(x => x.Id == request.UserId)   //SelectMany는 Include 없이도 내비게이션 프로퍼티 데이터를 "직접" 가져오므로, 필요한 데이터를 쿼리에서 뽑아오는 역할을 합니다.
                            .SelectMany(x => x.Photos)             //Include는 엔터티 전체를 함께 로드하는 데 쓰이고,
                            .ToListAsync(cancellationToken);     //Select나 SelectMany는 원하는 필드나 컬렉션만 쿼리해서 가져오고 싶을 때 더 유용합니다.

                return Result<List<Photo>>.Success(photos);
            }
        }
    }
}