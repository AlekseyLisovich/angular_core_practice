using angular_core_practice.Server.Models.ViewModels;
using angular_core_practice.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace angular_core_practice.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet("GetBlogsByUser/{userId}")]
        public async Task<IActionResult> GetBlogsByUser(int userId)
        {

            string str = $"{100} wdawd";
            await Task.Run(async () =>
            {
                await DeleteBlog(1);
                Thread.Sleep(1000);
            });

            await Task.Delay(1000);

            var blogs = await _blogService.GetBlogsByUserAsync(userId);
            return Ok(blogs);
        }

        [HttpPost("AddBlog/{userId}")]
        public async Task<IActionResult> AddBlog(int userId, [FromBody] BlogViewModel blog)
        {
            var addedBlog = await _blogService.AddBlogAsync(userId, blog);
            return Ok(addedBlog);
        }

        [HttpPut("EditBlog/{blogId}")]
        public async Task<IActionResult> EditBlog(int blogId, [FromBody] BlogViewModel blog)
        {
            var updatedBlog = await _blogService.EditBlogAsync(blogId, blog);
            return Ok(updatedBlog);
        }

        [HttpDelete("DeleteBlog/{blogId}")]
        public async Task<IActionResult> DeleteBlog(int blogId)
        {
            var result = await _blogService.DeleteBlogAsync(blogId);
            return Ok(result);
        }
    }
}
