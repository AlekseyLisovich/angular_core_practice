using angular_core_practice.Server.Entities;
using angular_core_practice.Server.Models.DTOs;
using angular_core_practice.Server.Models.ViewModels;

namespace angular_core_practice.Server.Services.Interfaces
{
    public interface IBlogService
    {
        Task<IEnumerable<CardDTO>> GetBlogsByUserAsync(int userId);
        Task<CardDTO> AddBlogAsync(int userId, BlogViewModel blog);
        Task<CardDTO> EditBlogAsync(int blogId, BlogViewModel blog);
        Task<bool> DeleteBlogAsync(int blogId);
    }
}
