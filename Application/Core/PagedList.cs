using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class PagedList<T, Cursor>
    {
        public List<T> Items { get; set; } = [];
        public Cursor? NextCursor { get; set; }
    }
}