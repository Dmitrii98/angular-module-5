import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    requestAllCourses,
    requestSingleCourse,
    requestFilteredCourses,
    requestEditCourse,
    requestCreateCourse,
    requestDeleteCourse
} from './courses.actions';
import {
    isAllCoursesLoadingSelector,
    isSingleCourseLoadingSelector,
    isSearchingStateSelector,
    getCourses,
    getAllCourses,
    getCourse,
    getErrorMessage
} from './courses.selectors';
import { CourseModule } from '../../components/course/course.module';

@Injectable({ providedIn: 'root' })
export class CoursesStateFacade {
    isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(isAllCoursesLoadingSelector));
    isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(isSingleCourseLoadingSelector));
    isSearchingState$: Observable<boolean> = this.store.pipe(select(isSearchingStateSelector));
    courses$: Observable<CourseModule[]> = this.store.pipe(select(getCourses));
    allCourses$: Observable<CourseModule[]> = this.store.pipe(select(getAllCourses));
    course$: Observable<CourseModule> = this.store.pipe(select(getCourse));
    errorMessage$: Observable<string> = this.store.pipe(select(getErrorMessage));

    constructor(private store: Store<CourseModule>) {}

    getAllCourses(): void {
        this.store.dispatch(requestAllCourses());
    }

    getSingleCourse(id: number): void {
        this.store.dispatch(requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(requestFilteredCourses({ searchValue }));
    }

    editCourse(body: Course, id: number): void {
        this.store.dispatch(requestEditCourse({ body, id }));
    }

    createCourse(body: Course): void {
        this.store.dispatch(requestCreateCourse({ body }));
    }

    deleteCourse(id: number): void {
        this.store.dispatch(requestDeleteCourse({ id }));
    }
}