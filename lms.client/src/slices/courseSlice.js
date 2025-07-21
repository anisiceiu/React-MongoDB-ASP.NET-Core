import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    currentCourse: null,
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        fetchCoursesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCoursesSuccess: (state, action) => {
            state.courses = action.payload;
            state.loading = false;
        },
        fetchCoursesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentCourse: (state, action) => {
            state.currentCourse = action.payload;
        },
        fetchInstructorCoursesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchInstructorCoursesSuccess: (state, action) => {
            state.courses = action.payload;
            state.loading = false;
        },
        fetchInstructorCoursesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateCourseSuccess: (state, action) => {
            const index = state.courses.findIndex(c => c._id === action.payload._id);
            if (index !== -1) {
                state.courses[index] = action.payload;
            }
            state.currentCourse = action.payload;
        },
    },
});

export const {
    fetchCoursesStart,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    setCurrentCourse,
    fetchInstructorCoursesStart,
    fetchInstructorCoursesSuccess,
    fetchInstructorCoursesFailure,
    updateCourseSuccess
} = courseSlice.actions;
export default courseSlice.reducer;