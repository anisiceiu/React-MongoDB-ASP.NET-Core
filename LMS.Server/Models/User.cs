﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LMS.Server.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; } = "Student"; // Admin | Instructor | Student
    }

}
