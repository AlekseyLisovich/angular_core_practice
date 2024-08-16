using angular_core_practice.Server.EF;
using angular_core_practice.Server.Entities;
using angular_core_practice.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace angular_core_practice.Server.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly ApplicationContext _context;

        public BlogRepository(ApplicationContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Card> GetByIdAsync(int id)
        {
            return await _context.Cards.FindAsync(id);
        }

        public async Task<IEnumerable<Card>> GetBlogsByUserAsync(int userId)
        {
            return await _context.Cards.Where(card => card.UserId == userId).ToListAsync();
        }

        public async Task<Card> AddAsync(Card card)
        {
            await _context.Cards.AddAsync(card);
            await _context.SaveChangesAsync();
            return card;
        }

        public async Task<Card> UpdateAsync(Card card)
        {
            _context.Entry(card).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return card;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var card = await GetByIdAsync(id);
            if (card == null)
                return false;

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<IEnumerable<Card>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
