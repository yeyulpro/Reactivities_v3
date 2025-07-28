using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
	public class IsHostRequirement :IAuthorizationRequirement
	{
	}
	//특정 활동에 대해 인증자가 권한이 있냐 없냐를  권한 검증 시점마다 db에서 조회되어 사용되어야함.
	public class IsHostRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsHostRequirement>
	{
		protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
		{                                                                   //권한(Authorization) 검사 과정에서만 쓰이는 컨텍스트				
																			//권한 검사 대상인 사용자(ClaimsPrincipal), 요구사항(requirements), 검사 결과 상태 등을 담고 있
																			//여기서 context.User는 현재 인증된 사용자의 ClaimsPrincipal 객체
																			//context.Succeed(requirement)나 context.Fail()로 권한 검사 결과를 보고
			var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (userId == null) return;
			var httpContext = httpContextAccessor.HttpContext;
			//HttpContext.User 와 AuthorizationHandlerContext.User 둘 다 같은 ClaimsPrincipal 객체를 참조합니다.권한 검사 로직 내에서는 AuthorizationHandlerContext.User를 바로 사용하는 게 보통입니다.
			//필요에 따라 HttpContext에서 사용자 정보를 꺼내는 것도 가능합니다.
			if (httpContext?.GetRouteValue("id") is not string activityId) return; // pattern matching  :
																				   //httpContext?.GetRouteValue("id")는 edit endpoint에서 넣어준 id의 값을 return해주는것
																				   // httpcontext에 이미 라우팅 정보가 들어가 있어서 그것을 백엔드에 id값을 보여주는 역할
																				   //id라는 문자열은 라우팅 템플릿에 정의된 이름과 정확히 일치해야 한다.- 키 값이다. value얻기위한.
			var attendee = await dbContext.ActivityAttendees.SingleOrDefaultAsync(x=>x.User.Id == userId && x.ActivityId == activityId);
			
			if(attendee == null) return;
			if (attendee.IsHost) context.Succeed(requirement);
		}
	}
}
