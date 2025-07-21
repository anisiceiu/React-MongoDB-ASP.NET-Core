using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace LMS.Server.Models
{
    public class Enrollment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("UserId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        [BsonElement("CourseId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CourseId { get; set; }

        [BsonElement("EnrolledAt")]
        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

        [BsonElement("Progress")]
        public double Progress { get; set; } = 0.0; // 0–100 percent

        [BsonElement("IsCompleted")]
        public bool IsCompleted { get; set; } = false;
    }
}
