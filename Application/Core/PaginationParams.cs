using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class PaginationParams<TCursor>
    {
        private const int MaxPageSize = 50;
        public TCursor? Cursor { get; set; } //커서(마지막으로 받은 활동 날짜)를 저장해서 다음 데이터부터 이어서 받게 합니다. 첫 요청할 땐 Cursor가 보통 null이에요 → 가장 첫 페이지, 즉 가장 오래된(또는 최신, 정렬 기준에 따라) 데이터부터 가져오기
        private int _pageSize = 3;   //서버에 있는 기본값이 3인 것은 클라이언트가 PageSize를 아예 안 보내거나, 3 이하의 값을 보냈을 때 적용하는 기본값
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}