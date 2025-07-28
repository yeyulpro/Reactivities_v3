using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
	public class ActivityAttendee
	{
		public string? UserId { get; set; }  // 이들? !  은 required되길 원하지 않고 에러/경고도 피하려고-ms가 권고함.  외래키 이고 (네비게이션 속성이 이것은 아니다)
		public User User { get; set; } = null!; // 이것이 네비게이션 속성: 장점: 쿼리로 쉽게 다른 엔티티를 가져옴, 자동으로 include해서 로딩 가능: linq로 더 읽기 쉬운 코드 작성 간으
		public string? ActivityId { get; set; }
		public Activity Activity { get; set; } = null!;
		public bool IsHost { get; set; }   //added due to jointtable
		public DateTime DateJoined { get; set; }=DateTime.UtcNow;

		//네비게이션이라고 부르는 이유:  그 속성을 통해서 다른 엔티티로 쉽게 이동할 수 있기 때문이다.

	}
}
