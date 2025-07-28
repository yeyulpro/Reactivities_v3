using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
	public class User : IdentityUser

	{
		public string? DisplayName { get; set; }
		public string? Bio { get; set; }
		 public string? ImageUrl { get; set; }

		// navigation properties-네비게이션 속성: 엔터티 간의 관계를 표현하기 위해서 다른 엔터티를 참조하는 속성이다.
		public ICollection<ActivityAttendee> Activities { get; set; } = [];
	}
}
