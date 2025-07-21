using LMS.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace LMS.Server.Data
{
    public class MongoContext
    {
        private readonly IMongoDatabase _database;

        public MongoContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
        public IMongoCollection<Course> Courses => _database.GetCollection<Course>("Courses");
        public IMongoCollection<Lesson> Lessons => _database.GetCollection<Lesson>("Lessons");
        public IMongoCollection<Enrollment> Enrollments => _database.GetCollection<Enrollment>("Enrollments");
    }

}
