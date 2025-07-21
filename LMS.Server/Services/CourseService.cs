﻿using LMS.Server.Data;
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
    }
}
