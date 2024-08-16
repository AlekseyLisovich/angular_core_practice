namespace angular_core_practice.Server.Models.DTOs
{
    public class CardDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
    }
}
