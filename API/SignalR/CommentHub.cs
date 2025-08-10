using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class CommentHub : Hub
    {
        private readonly IMediator _mediator;
        public CommentHub(  IMediator mediator)
    
        {
            _mediator = mediator;
            
        }
        public async Task SendComment(AddComment.Command command)
        {
            var comment = await _mediator.Send(command);
            //여기서 await _mediator.Send(command)는 새로운 댓글을 DB에 저장하는 작업(커맨드 핸들러 실행)을 의미합니다.
            await Clients.Group(command.ActivityId).SendAsync("ReceiveComment", comment.Value);
            //그 결과로 만들어진 댓글(comment.Value)을 같은 Activity 그룹에 속한 모든 클라이언트에게 "ReceiveComment"라는 이벤트와 함께 보냅니다.

//즉, 새로운 댓글 하나(comment)만을 Activity 그룹의 모든 클라이언트에 전송하는 것 맞습니다.
        }
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext?.Request.Query["activityId"];

            if (string.IsNullOrEmpty(activityId)) throw new HubException("No activity with this id");

            await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);
            var result = await _mediator.Send(new GetComments.Query { ActivityId = activityId! });
//QueryHandler는 보통 같은 프로젝트 내, Application 또는 Features 같은 폴더에 위치하며, 
            // GetComments.Query를 받아서 DB에서 해당 Activity에 연결된 댓글들을 조회하고 결과를 리턴하는 역할을 합니다.
            //즉, await _mediator.Send(...)는 서버 내부에서 어떤 작업을 요청하고 결과를 기다리는 코드이지,
            //  바로 클라이언트로 뭔가 보내는 것이 아닙니다.
            await Clients.Caller.SendAsync("LoadComments", result.Value);
            
           //Clients.Caller.SendAsync는 SignalR에서 해당 클라이언트(연결자)에게 특정 메시지("LoadComments")와 데이터를 보내는 것입니다.

//여기서는 result.Value (즉, DB에서 조회한 댓글 리스트 등)를 클라이언트 쪽으로 보냅니다.

//즉, 클라이언트에서는 "LoadComments"라는 이벤트를 받고, 그 안에 담긴 댓글 데이터를 처리하도록 작성되어 있어야 합니다.
        }
    }
        
}
