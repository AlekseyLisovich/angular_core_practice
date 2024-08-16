namespace angular_core_practice.Server.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> AddAsync(T user);
        Task<T> UpdateAsync(T user);
        Task<bool> DeleteAsync(int id);
    }
}
