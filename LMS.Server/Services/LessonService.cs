using LMS.Server.Data;
using LMS.Server.DTOs;
using LMS.Server.Interfaces;
using LMS.Server.Models;
using MongoDB.Driver;

namespace LMS.Server.Services
{
    public class LessonService : ILessonService
    {
        private readonly MongoContext _context;

        public LessonService(MongoContext context)
        {
            _context = context;
        }

        public async Task<List<Lesson>> GetLessonsByCourseIdAsync(string courseId)
        {
            return await _context.Lessons
                .Find(l => l.CourseId == courseId)
                .SortBy(l => l.Order)
                .ToListAsync();
        }

        public async Task<Lesson?> GetLessonByIdAsync(string lessonId)
        {
            return await _context.Lessons.Find(l => l.Id == lessonId).FirstOrDefaultAsync();
        }

        public async Task<Lesson> CreateLessonAsync(string courseId, LessonDto dto)
        {
            var lesson = new Lesson
            {
                CourseId = courseId,
                Title = dto.Title,
                VideoUrl = dto.VideoUrl,
                Content = dto.Content,
                Order = dto.Order,
                CreatedAt = DateTime.UtcNow
            };

            await _context.Lessons.InsertOneAsync(lesson);

            // Optional: update Course document to include this lesson ID
            var update = Builders<Course>.Update.Push(c => c.Lessons, lesson.Id);
            await _context.Courses.UpdateOneAsync(c => c.Id == courseId, update);

            return lesson;
        }

        public async Task<bool> UpdateLessonAsync(string lessonId, LessonDto dto)
        {
            var update = Builders<Lesson>.Update
                .Set(l => l.Title, dto.Title)
                .Set(l => l.VideoUrl, dto.VideoUrl)
                .Set(l => l.Content, dto.Content)
                .Set(l => l.Order, dto.Order);

            var result = await _context.Lessons.UpdateOneAsync(l => l.Id == lessonId, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteLessonAsync(string lessonId)
        {
            var lesson = await _context.Lessons.Find(l => l.Id == lessonId).FirstOrDefaultAsync();
            if (lesson == null) return false;

            await _context.Courses.UpdateOneAsync(
                c => c.Id == lesson.CourseId,
                Builders<Course>.Update.Pull(c => c.Lessons, lessonId));

            var result = await _context.Lessons.DeleteOneAsync(l => l.Id == lessonId);
            return result.DeletedCount > 0;
        }
    }
}
