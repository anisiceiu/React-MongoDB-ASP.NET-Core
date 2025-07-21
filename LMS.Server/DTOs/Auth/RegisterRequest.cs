﻿namespace LMS.Server.DTOs.Auth
{
    public class RegisterRequest
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public string Role { get; set; } = "Student"; // Student | Instructor
    }
}
