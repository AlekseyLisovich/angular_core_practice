namespace angular_core_practice.Server.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

        public ICollection<Card>? Cards { get; set; }
    }
}
