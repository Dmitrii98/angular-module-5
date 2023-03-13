import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { CoursesService } from "../../services/courses.service";
import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess,
    requestDeleteCourse,
    requestDeleteCourseFail,
    requestDeleteCourseSuccess,
    requestEditCourse,
    requestEditCourseSuccess,
    requestFilteredCourses,
    requestFilteredCoursesSuccess,
    requestSingleCourse,
    requestSingleCourseFail,
    requestSingleCourseSuccess
} from "./courses.actions";
import { CoursesStateFacade } from "./courses.facade";
import { Router } from "@angular/router";

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesFacade: CoursesStateFacade,
        private router: Router
    ) {
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAllCourses),
            switchMap(() =>
                this.coursesService.getAll().pipe(
                    map((courses: Course[]) => requestAllCoursesSuccess({courses})),
                    catchError((error) => of(requestAllCoursesFail({error: error.message})))
                )
            )
        )
    );
    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestFilteredCourses),
            switchMap(({searchValue}) =>
                this.coursesFacade.allCourses$.pipe(
                    map((courses: Course[]) =>
                        courses.filter((course) => course.name.toLowerCase().includes(searchValue.toLowerCase()))
                    ),
                    map((courses: Course[]) => requestFilteredCoursesSuccess({courses}))
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestSingleCourse),
            switchMap(({id}) =>
                this.coursesService.getSpecificCourse(id).pipe(
                    map((course: Course) => requestSingleCourseSuccess({course})),
                    catchError((error) => of(requestSingleCourseFail({error: error.message})))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestDeleteCourse),
            switchMap(({id}) =>
                this.coursesService.deleteCourse(id).pipe(
                    map(() => requestDeleteCourseSuccess()),
                    catchError((error) => of(requestDeleteCourseFail({error: error.message})))
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestEditCourse),
            switchMap(({course}) =>
                this.coursesService.editCourse(course).pipe(
                    map(() => requestEditCourseSuccess)
                )
            )
        )
    );
}