using LMS.Server.Data;
using LMS.Server.DTOs;
using LMS.Server.Interfaces;
using LMS.Server.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LMS.Server.Services
{
    public class CourseService : ICourseService
    {
        private readonly MongoContext _context;

        public CourseService(MongoContext context)
        {
            _context = context;
        }

        public async Task<List<Course>> GetAllCoursesAsync()
        {
            return await _context.Courses.Find(_ => true).ToListAsync();
        }

        public async Task<Course?> GetCourseByIdAsync(string courseId)
        {
            return await _context.Courses.Find(c => c.Id == courseId).FirstOrDefaultAsync();
        }

        public async Task<List<Course>> GetinstructorCoursesByIdAsync(string instructorId)
        {
            return await _context.Courses.Find(_ => _.InstructorId == instructorId).ToListAsync();
        }

        public async Task<Course> CreateCourseAsync(CourseDto dto, string instructorId)
        {
            var newCourse = new Course
            {
                Title = dto.Title,
                Description = dto.Description,
                Category = dto.Category,
                Price = dto.Price,
                IsPublished = dto.IsPublished,
                InstructorId = instructorId,
                Lessons = new List<string>(),
                CreatedAt = DateTime.UtcNow
            };

            await _context.Courses.InsertOneAsync(newCourse);
            return newCourse;
        }

        public async Task<bool> UpdateCourseAsync(string courseId, CourseDto dto)
        {
            var update = Builders<Course>.Update
                .Set(c => c.Title, dto.Title)
                .Set(c => c.Description, dto.Description)
                .Set(c => c.Category, dto.Category)
                .Set(c => c.Price, dto.Price)
                .Set(c => c.IsPublished, dto.IsPublished);

            var result = await _context.Courses.UpdateOneAsync(
                c => c.Id == courseId,
                update
            );

            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteCourseAsync(string courseId)
        {
            var result = await _context.Courses.DeleteOneAsync(c => c.Id == courseId);
            return result.DeletedCount > 0;
        }

        public async Task EnrollUserAsync(string courseId, string userId)
        {
            var alreadyEnrolled = await _context.Enrollments
                .Find(e => e.CourseId == courseId && e.UserId == userId)
                .FirstOrDefaultAsync();

            if (alreadyEnrolled != null)
            {
                throw new InvalidOperationException("User already enrolled in this course.");
            }

            var enrollment = new Enrollment
            {
                CourseId = courseId,
                UserId = userId
            };

            await _context.Enrollments.InsertOneAsync(enrollment);
        }

        public async Task<List<Course>> GetEnrolledCoursesAsync(string userId)
        {
            var enrollments = await _context.Enrollments
                .Find(e => e.UserId == userId)
                .ToListAsync();

            var courseIds = enrollments.Select(e => e.CourseId).ToList();

            if (!courseIds.Any()) return new List<Course>();

            var courses = await _context.Courses
                .Find(c => courseIds.Contains(c.Id))
                .ToListAsync();

            return courses;
        }

        public async Task<List<EnrollmentDto>> GetEnrollmentsByCourseIdAsync(string courseId)
        {
            var objectCourseId = ObjectId.Parse(courseId);

            var pipeline = new BsonDocument[]
 {
    new BsonDocument("$match", new BsonDocument("CourseId", objectCourseId)),

    new BsonDocument("$lookup", new BsonDocument
    {
        { "from", "Users" },
        { "localField", "UserId" },
        { "foreignField", "_id" },
        { "as", "User" }
    }),

    new BsonDocument("$unwind", "$User"),

    new BsonDocument("$project", new BsonDocument
    {
        { "_id", 0 },
        { "UserId", new BsonDocument("$toString", "$UserId") },  // 👈 Convert to string here
        { "UserName", "$User.Name" },
        { "Email", "$User.Email" },
        { "EnrollmentDate", "$EnrolledAt" },
        { "CompletionStatus", "$IsCompleted" }
    })
 };


            var results = await _context.Enrollments
                .Aggregate<EnrollmentDto>(pipeline)
                .ToListAsync();

            return results;
        }


    }
}
