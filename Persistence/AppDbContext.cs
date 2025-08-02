using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
	public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
	{
		public required DbSet<Activity> Activities { get; set; }
		public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
		public required DbSet<Photo> Photos { get; set; }


		protected override void OnModelCreating(ModelBuilder builder)  //강사는 chanining/fluent 방식을 사용했다.
		{
			base.OnModelCreating(builder);   // haskey: 기본키 설정, jointable: 경우 2개 이상의 컬럼으로 구성된 복합키 사용

			builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.ActivityId, aa.UserId }));// 복합기 설정과정
			builder.Entity<ActivityAttendee>().HasOne(aa => aa.User).WithMany(aa => aa.Activities).HasForeignKey(aa => aa.UserId); //onesided
			builder.Entity<ActivityAttendee>().HasOne(aa => aa.Activity).WithMany(aa => aa.Attendees).HasForeignKey(aa => aa.ActivityId);//the other sided


			// lambda method방식으로도 정렬할 수 있음. 

		}	
	}
}
