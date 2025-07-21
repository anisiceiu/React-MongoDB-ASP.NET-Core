using LMS.Server.DTOs;
using LMS.Server.Models;

namespace LMS.Server.Interfaces
{
    public interface ILessonService
    {
        Task<List<Lesson>> GetLessonsByCourseIdAsync(string courseId);
        Task<Lesson?> GetLessonByIdAsync(string lessonId);
        Task<Lesson> CreateLessonAsync(string courseId, LessonDto dto);
        Task<bool> UpdateLessonAsync(string lessonId, LessonDto dto);
        Task<bool> DeleteLessonAsync(string lessonId);
    }
}
