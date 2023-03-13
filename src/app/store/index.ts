import { ActionReducerMap } from "@ngrx/store";
import { CourseModule } from "../components/course/course.module";
import { coursesReducer } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";

export interface State {
    allCourses: CourseModule[];
    course: CourseModule | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

export const reducers: ActionReducerMap<State> = {coursesReducer};

export const effects = CoursesEffects;