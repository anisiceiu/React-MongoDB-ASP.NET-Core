using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace LMS.Server.Models
{
    public class Course
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public bool IsPublished { get; set; }
        public string InstructorId { get; set; }
        public List<string> Lessons { get; set; } = new List<string>();
        public DateTime CreatedAt { get; set; }
    }
}
