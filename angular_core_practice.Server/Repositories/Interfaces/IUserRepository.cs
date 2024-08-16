using angular_core_practice.Server.Entities;

namespace angular_core_practice.Server.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByEmailAsync(string email);
    }
}
