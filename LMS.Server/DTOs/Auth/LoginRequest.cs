﻿namespace LMS.Server.DTOs.Auth
{
    public class LoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
