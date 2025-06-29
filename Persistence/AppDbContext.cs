﻿using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
	public class AppDbContext : DbContext
	{
		public required DbSet<Activity> Activities { get; set; }
		public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
		{
			
		}
	}
}
