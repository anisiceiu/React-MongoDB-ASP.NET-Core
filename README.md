# React-MongoDB-ASP.NET-Core

Learning Management System (LMS)
Teachers can post courses and students can enroll.

Features:

Video lessons, quizzes

Role-based authentication (Teacher, Student, Admin)

Course progress tracking

2.1 Product Perspective
Frontend: SPA built with React

Backend: RESTful API using ASP.NET Core and Express

Database: MongoDB (Mongoose ODM)

Authentication: JWT-based auth


2.2 User Classes and Characteristics
Admin: Manage users, monitor platform usage

Instructor: Create courses, lessons, quizzes

Student: Enroll in courses, watch lessons, take quizzes

3.1 User Authentication
Register (student/instructor)

Login with email/password

Forgot/reset password

JWT token-based session handling

3.2 User Roles
Admin Dashboard: User & course overview

Instructor Dashboard: Course, lesson & quiz management

Student Dashboard: My Courses, Progress, Quizzes

3.3 Course Management (Instructor)
Create/Edit/Delete course

Add lessons (video, PDF, description)

Add quizzes to lessons

Set pricing (free/paid)

3.4 Enrollment & Learning (Student)
Browse course catalog

Enroll in courses (free or after payment)

View lessons sequentially

Track completion progress

Take quizzes and view results

3.5 Quiz Module
MCQ quizzes linked to lessons

Randomize questions

Store results in DB

Show correct/wrong answers post-submission

3.6 Admin Management
View/edit/delete any user or course

Monitor platform analytics

Approve instructors or flag content

