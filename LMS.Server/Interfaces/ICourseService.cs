using LMS.Server.DTOs;
using LMS.Server.Models;
using Microsoft.AspNetCore.Mvc;

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
        Task EnrollUserAsync(string courseId, string userId);
        Task<List<Course>> GetEnrolledCoursesAsync(string userId);
        Task<List<EnrollmentDto>> GetEnrollmentsByCourseIdAsync(string courseId);
    }
}
