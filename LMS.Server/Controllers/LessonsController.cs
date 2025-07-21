using LMS.Server.DTOs;
using LMS.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Server.Controllers
{
    [ApiController]
    [Route("api/courses/{courseId}/lessons")]
    public class LessonsController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonsController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        // GET: /api/courses/{courseId}/lessons
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetLessonsByCourse(string courseId)
        {
            var lessons = await _lessonService.GetLessonsByCourseIdAsync(courseId);
            return Ok(lessons);
        }

        // GET: /api/courses/{courseId}/lessons/{lessonId}
        [HttpGet("{lessonId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetLesson(string lessonId)
        {
            var lesson = await _lessonService.GetLessonByIdAsync(lessonId);
            if (lesson == null) return NotFound();
            return Ok(lesson);
        }

        // POST: /api/courses/{courseId}/lessons
        [HttpPost]
        [Authorize(Roles = "instructor,admin,Instructor,Admin")]
        public async Task<IActionResult> CreateLesson(string courseId, [FromBody] LessonDto dto)
        {
            var lesson = await _lessonService.CreateLessonAsync(courseId, dto);
            return CreatedAtAction(nameof(GetLesson), new { courseId = courseId, lessonId = lesson.Id }, lesson);
        }

        // PUT: /api/courses/{courseId}/lessons/{lessonId}
        [HttpPut("{lessonId}")]
        [Authorize(Roles = "instructor,admin,Instructor,Admin")]
        public async Task<IActionResult> UpdateLesson(string lessonId, [FromBody] LessonDto dto)
        {
            var updated = await _lessonService.UpdateLessonAsync(lessonId, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        // DELETE: /api/courses/{courseId}/lessons/{lessonId}
        [HttpDelete("{lessonId}")]
        [Authorize(Roles = "instructor,admin,Instructor,Admin")]
        public async Task<IActionResult> DeleteLesson(string lessonId)
        {
            var deleted = await _lessonService.DeleteLessonAsync(lessonId);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
