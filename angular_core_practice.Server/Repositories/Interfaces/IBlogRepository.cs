using angular_core_practice.Server.Entities;

namespace angular_core_practice.Server.Repositories.Interfaces
{
    public interface IBlogRepository : IRepository<Card>
    {
        Task<IEnumerable<Card>> GetBlogsByUserAsync(int userId);
    }
}
