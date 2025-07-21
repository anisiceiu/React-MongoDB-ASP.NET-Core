using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace LMS.Server.Models
{
    public class Lesson
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string CourseId { get; set; }
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
