using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Body { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //navigation properties one to many

        public required string UserId { get; set; }
        public User User { get; set; } = null!;
        public required string ActivityId { get; set; }
        public Activity Activity { get; set; } = null!;
        // User 과 Activity 의 required를 지웠다.  UserID, ActivityID 가 필수이지
        //  User/Activity를 comment에 passing 하기를 원한것은 아니다.



    }
}