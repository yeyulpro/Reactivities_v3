﻿using System;
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

		//navigation property

		public required string UserId { get; set; }
		[JsonIgnore]
		public User? User { get; set; }
	}
}
