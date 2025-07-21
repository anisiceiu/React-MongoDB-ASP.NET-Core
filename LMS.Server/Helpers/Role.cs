namespace LMS.Server.Helpers
{
    public static class Role
    {
        public const string Admin = "Admin";
        public const string Instructor = "Instructor";
        public const string Student = "Student";

        public static readonly string[] All = new[] { Admin, Instructor, Student };
    }

}
