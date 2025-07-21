using LMS.Server.DTOs;
using LMS.Server.Models;

namespace LMS.Server.Interfaces
{
    public interface ICourseService
    {
        Task<List<Course>> GetAllCoursesAsync();
        Task<Course?> GetCourseByIdAsync(string courseId);
        Task<Course> CreateCourseAsync(CourseDto dto, string instructorId);
        Task<bool> UpdateCourseAsync(string courseId, CourseDto dto);
        Task<bool> DeleteCourseAsync(string courseId);
        Task<List<Course>> GetinstructorCoursesByIdAsync(string instructorId);
    }
}
