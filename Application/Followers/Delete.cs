using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic goes here

                var observer = await _context.Users.SingleOrDefaultAsync(
                    x=> x.UserName == _userAccessor.GetCurrentUserName()
                );

                var target = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == request.Username
                );

                if(target == null)
                    throw new RestExceptions(System.Net.HttpStatusCode.NotFound, new {User = "Not found"});
                
                var following = await _context.Followings.SingleOrDefaultAsync(
                    x=> x.ObserverId == observer.Id && x.TargetId == target.Id
                );

                if(following == null)
                    throw new RestExceptions(System.Net.HttpStatusCode.NotFound, new {User = "You are not following this user !"});
                
                if(following != null){
                    
                    _context.Followings.Remove(following);
                }

                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem occur saving changes");

            }
        }
    }
}