import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey } from './courses.reducer';
import { CourseModule } from '../../components/course/course.module';
import { State } from "../index";

export const coursesFeatureSelector = createFeatureSelector<State>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
    coursesFeatureSelector,
    (state: State) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
    coursesFeatureSelector,
    (state: State) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
    coursesFeatureSelector,
    (state: State) => state.isSingleCourseLoading
);

export const getCourses = createSelector(
    coursesFeatureSelector,
    (state: State) => state.allCourses
);

export const getAllCourses = createSelector(
    getCourses,
    (courses: CourseModule[]) => courses.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
);

export const getCourse = createSelector(
    coursesFeatureSelector,
    (state: State) => state.course
);

export const getErrorMessage = createSelector(
    coursesFeatureSelector,
    (state: State) => state.errorMessage
);