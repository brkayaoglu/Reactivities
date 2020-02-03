using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Followers;
using Application.Profile;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Microsoft.AspNetCore.Mvc.Route("api/profiles")]
    public class FollowersController : BaseController
    {
        [HttpPost("{username}/follow")]

        public async Task<ActionResult<Unit>> Follow(string username)
        {
            //Console.WriteLine(command);
            return await Mediator.Send(new Add.Command { Username = username });
        }

        [HttpDelete("{username}/follow")]

        public async Task<ActionResult<Unit>> Unfollow(string username)
        {
            //Console.WriteLine(command);
            return await Mediator.Send(new Delete.Command { Username = username });
        }

        [HttpGet("{username}/follow")]
        public async Task<ActionResult<List<Profile>>> GetFollowings(string username, string predicate)
        {
            return await Mediator.Send(new List.Query { Username = username, Predicate = predicate });
        }
    }
}