using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
	public class AutoMapping:Profile
	{
		public AutoMapping()
		{
			CreateMap<Activity, Activity>();
		}
	}
}
