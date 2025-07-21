using LMS.Server.DTOs;
using LMS.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CoursesController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        // GET: api/courses
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseService.GetAllCoursesAsync();
            return Ok(courses);
        }

        // GET: api/courses/{id}
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCourseById(string id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            if (course == null) return NotFound();
            return Ok(course);
        }

        //
        [HttpGet("instructor/{instructorId}")]
        public async Task<IActionResult> GetinstructorCoursesById(string instructorId)
        {
            var course = await _courseService.GetinstructorCoursesByIdAsync(instructorId);
            if (course == null) return NotFound();
            return Ok(course);
        }

        // POST: api/courses
        [HttpPost]
        [Authorize(Roles = "instructor,admin,Instructor,Admin")]
        public async Task<IActionResult> CreateCourse([FromForm] CourseDto dto)
        {
            var instructorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Handle file upload if needed
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                // Process file here
            }
            var course = await _courseService.CreateCourseAsync(dto, instructorId);
            return CreatedAtAction(nameof(GetCourseById), new { id = course.Id }, course);
        }

        // PUT: api/courses/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "instructor,admin,Instructor,Admin")]
        public async Task<IActionResult> UpdateCourse(string id, [FromForm] CourseDto dto)
        {
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                // Process file here
            }
            var updated = await _courseService.UpdateCourseAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        // DELETE: api/courses/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "instructor,admin,Instructor,Admin")]
        public async Task<IActionResult> DeleteCourse(string id)
        {
            var deleted = await _courseService.DeleteCourseAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [Authorize(Roles = "student,instructor,admin,Instructor,Admin,Student")]
        [HttpPost("{courseId}/enroll")]
        public async Task<IActionResult> Enroll(string courseId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            try
            {
                await _courseService.EnrollUserAsync(courseId, userId);
                return Ok(new { message = "Enrollment successful" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("my-enrollments")]
        public async Task<IActionResult> GetUserEnrollments()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var courses = await _courseService.GetEnrolledCoursesAsync(userId);
            return Ok(courses);
        }

        [HttpGet("{courseId}/enrollments")]
        [Authorize(Roles = "admin,instructor")] // Only accessible by admins/instructors
        public async Task<IActionResult> GetCourseEnrollments(string courseId)
        {
            var enrollments = await _courseService.GetEnrollmentsByCourseIdAsync(courseId);
            return Ok(enrollments);
        }
    }
}
