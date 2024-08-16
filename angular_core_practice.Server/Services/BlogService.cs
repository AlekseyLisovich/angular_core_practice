using angular_core_practice.Server.Entities;
using angular_core_practice.Server.Models.DTOs;
using angular_core_practice.Server.Models.ViewModels;
using angular_core_practice.Server.Repositories;
using angular_core_practice.Server.Repositories.Interfaces;
using angular_core_practice.Server.Services.Interfaces;

namespace angular_core_practice.Server.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;

        public BlogService(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        public async Task<IEnumerable<CardDTO>> GetBlogsByUserAsync(int userId)
        {
            var cards = await _blogRepository.GetBlogsByUserAsync(userId);

            var cardDTOs = cards.Select(card => new CardDTO
            {
                Id = card.Id,
                UserId = card.UserId,
                CreatedAt = card.CreatedAt,
                Author = card.Author,
                Title = card.Title
            });
            return cardDTOs;
        }

        public async Task<CardDTO> AddBlogAsync(int userId, BlogViewModel blog)
        {
            var card = new Card { CreatedAt = blog.CreatedAt, Author = blog.Author, Title = blog.Title, UserId = userId };
            card = await _blogRepository.AddAsync(card);
            return new CardDTO { CreatedAt = card.CreatedAt, Author = card.Author, Title = card.Title, UserId = card.UserId };
        }

        public async Task<CardDTO> EditBlogAsync(int blogId, BlogViewModel blog)
        {
            var existingBlog = await _blogRepository.GetByIdAsync(blogId);
            if (existingBlog == null)
            {
                throw new Exception($"Blog with id {blogId} not found.");
            }

            existingBlog.Author = blog.Author;
            existingBlog.Title = blog.Title;
            existingBlog.CreatedAt = blog.CreatedAt;
            existingBlog.Author = blog.Author;

            await _blogRepository.UpdateAsync(existingBlog);

            return new CardDTO { CreatedAt = blog.CreatedAt, Author = blog.Author, Title = blog.Title, UserId = blog.UserId };
        }

        public async Task<bool> DeleteBlogAsync(int blogId)
        {
            return await _blogRepository.DeleteAsync(blogId);
        }
    }
}
