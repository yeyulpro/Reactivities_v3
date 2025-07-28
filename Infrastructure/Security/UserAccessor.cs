using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{  //UserAccessor	직접 HttpContext의 User Claims를 보고 DB 조회,여기 UserAccessor 클래스는 ASP.NET Core Identity Minimal API Endpoint와는 별개로 동작하는 코드입니다.
//Identity API Endpoints	Minimal API 방식으로 로그인/회원가입/로그아웃 등 처리 ;둘은 역할이 다릅니다	Identity API Endpoint는 인증 처리, UserAccessor는 사용자 조회
	public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
	{                          //일반 서비스 클래스나 도메인 레이어에서 로그인된 사용자 정보를 알고 싶을 때
						//IHttpContextAccessor는 어디서든 현재 요청의 HttpContext를 가져올 수 있게 해주는 도우미
//일반 클래스나 서비스에서는 기본적으로 HttpContext에 접근할 수 없습니다.그래서 필요한 게 바로 👉 **IHttpContextAccessor**입니다.
		public async Task<User> GetUserAsync()
		{
			return await dbContext.Users.FindAsync(GetUserId()) ?? throw new UnauthorizedAccessException("No user is logged in.");
		}

		public string GetUserId()
		{
			return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No user found");
		}
	}
}
