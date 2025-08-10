using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
	public class Photo
	{
		public  string Id { get; set; } = Guid.NewGuid().ToString();
		public required string Url { get; set; }
		public required string PublicId { get; set; }

		//navigation property : 만약 이 네비게이션 프라퍼티 없이 데이터베이스로 올리면 Shadow Foreign Key Property를 자동으로 생성해서 테이블은 만들지만, 
		//photo table 에 생긴 UserId는 nullable==true, 즉 외래키가 nullable,즉 UserId값이 없어도 photo record가 존재할 수 있다
		// , 그리고 deletion 규칙이 없다. 그렇게 되면 user를 지웠을때 관련된 사진은 지워지지 않게 된다.:네비게이션 속성이 없고, Shadow FK가 기본 설정일 경우 EF Core는 기본적으로 Cascade Delete를 설정하지 않습니다. (즉, 삭제 규칙 없음)
//User가 삭제되어도 관련된 Photo 레코드는 그대로 남아있게 됩니다.이 경우 데이터가 **고아 데이터(Orphaned data)**가 되어버립니다.애플리케이션 레벨에서 수동으로 삭제 처리를 해줘야 하거나,DB에서 FK 제약조건이 없기 때문에 User 삭제에 제한도 없습니다.
		public required string UserId { get; set; }
		[JsonIgnore] // entity를 돌려주니깐 이거 쓰지 , 만약 dto 사용하면 없애면 되는데
		public User User { get; set; } = null!;
	}
}
