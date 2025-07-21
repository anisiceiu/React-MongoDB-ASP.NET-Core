using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LMS.Server.DTOs
{
    public class EnrollmentDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public bool CompletionStatus { get; set; }
    }
}
