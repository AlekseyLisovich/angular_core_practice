namespace angular_core_practice.Server.Entities
{
    public class Card
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Author { get; set; } = null!;
        public string? Title { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
