import { createAction, props } from '@ngrx/store';
import { CourseModule } from '../../components/course/course.module';

// Actions for request all courses
export const requestAllCourses = createAction(
    '[Courses] Request All Courses'
);

export const requestAllCoursesSuccess = createAction(
    '[Courses] Request All Courses Success',
    props<{ courses: CourseModule[] }>()
);

export const requestAllCoursesFail = createAction(
    '[Courses] Request All Courses Fail',
    props<{ error: string }>()
);

// Actions for request individual course
export const requestSingleCourse = createAction(
    '[Courses] Request Single Course',
    props<{ courseId: string }>()
);

export const requestSingleCourseSuccess = createAction(
    '[Courses] Request Single Course Success',
    props<{ course: CourseModule }>()
);

export const requestSingleCourseFail = createAction(
    '[Courses] Request Single Course Fail',
    props<{ error: string }>()
);

// Actions for request filtered courses
export const requestFilteredCourses = createAction(
    '[Courses] Request Filtered Courses',
    props<{ filter: string }>()
);

export const requestFilteredCoursesSuccess = createAction(
    '[Courses] Request Filtered Courses Success',
    props<{ courses: CourseModule[] }>()
);

export const requestFilteredCoursesFail = createAction(
    '[Courses] Request Filtered Courses Fail',
    props<{ error: string }>()
);

// Actions for delete course
export const requestDeleteCourse = createAction(
    '[Courses] Request Delete Course',
    props<{ courseId: string }>()
);

export const requestDeleteCourseSuccess = createAction(
    '[Courses] Request Delete Course Success',
    props<{ courseId: string }>()
);

export const requestDeleteCourseFail = createAction(
    '[Courses] Request Delete Course Fail',
    props<{ error: string }>()
);

// Actions for edit course
export const requestEditCourse = createAction(
    '[Courses] Request Edit Course',
    props<{ course: CourseModule }>()
);

export const requestEditCourseSuccess = createAction(
    '[Courses] Request Edit Course Success',
    props<{ course: CourseModule }>()
);

export const requestEditCourseFail = createAction(
    '[Courses] Request Edit Course Fail',
    props<{ error: string }>()
);

// Actions for create course
export const requestCreateCourse = createAction(
    '[Courses] Request Create Course',
    props<{ course: CourseModule }>()
);

export const requestCreateCourseSuccess = createAction(
    '[Courses] Request Create Course Success',
    props<{ course: CourseModule }>()
);

export const requestCreateCourseFail = createAction(
    '[Courses] Request Create Course Fail',
    props<{ error: string }>()
);