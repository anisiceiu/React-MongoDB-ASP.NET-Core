namespace LMS.Server.DTOs
{
    public class CourseDto
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Category { get; set; } = "";
        public decimal Price { get; set; }
        public bool IsPublished { get; set; }
    }
}
