using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserFollowing
    {
        public required string FollowingId { get; set; }
        public User Following { get; set; } = null!; // 나한테서 팔로잉 당한 사람들; target 대상자
        public required string FollowerId { get; set; }
        public User Follower { get; set; } = null!;// 나를 팔로잉 하는 무리들;추종자.     
    }
}

//추종자(팔로우 시작자들)---> 대상자(팔로우 당함)의 한방향으로의 관계를 정의학 객체가 될수 있는 class