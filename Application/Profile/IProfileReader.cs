using System.Threading.Tasks;

namespace Application.Profile
{
    public interface IProfileReader
    {
         Task<Profile> ReadProfile(string username);
    }
}