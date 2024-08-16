using angular_core_practice.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace angular_core_practice.Server.EF
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Card> Cards { get; set; } = null!;

        public DbSet<Card> Shit { get; set; } = null!;


        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Card>()
                .HasOne(u => u.User)
                .WithMany(c => c.Cards)
                .HasForeignKey(c => c.UserId);
        }
    }
}
