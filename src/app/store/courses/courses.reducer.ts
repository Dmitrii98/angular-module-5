import { createReducer, on } from "@ngrx/store";
import { CourseModule } from "../../components/course/course.module";
import * as CoursesActions from "./courses.actions";
import { State } from "../index";

export const coursesFeatureKey = "courses";

export const initialState: State = {
    allCourses: [],
    course: CourseModule,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ""
};

export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        allCourses: [],
        isAllCoursesLoading: true,
        errorMessage: ""
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, {courses}) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false
    })),
    on(CoursesActions.requestAllCoursesFail, (state, {error}) => ({
        ...state,
        allCourses: [],
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        course: [null],
        isSingleCourseLoading: true,
        errorMessage: ""
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, {course}) => ({
        ...state,
        course: course,
        isSingleCourseLoading: false
    })),
    on(CoursesActions.requestSingleCourseFail, (state, {error}) => ({
        ...state,
        course: null,
        isSingleCourseLoading: false,
        errorMessage: error
    })),
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        allCourses: [],
        isAllCoursesLoading: true,
        isSearchState: true,
        errorMessage: ""
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, {courses}) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false
    })),
);