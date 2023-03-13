import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CourseModule } from '../../shared/components/course/course.module';
import { CoursesService } from './courses.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private _courses$ = new BehaviorSubject<CourseModule[]>([]);
    private coursesLoaded = false;

    constructor(private coursesService: CoursesService) {}

    get courses$(): Observable<CourseModule[]> {
        if (!this.coursesLoaded) {
            this.loadCourses();
        }
        return this._courses$.asObservable();
    }

    loadCourses(): void {
        this.coursesService.getAll().subscribe(courses => {
            this._courses$.next(courses);
            this.coursesLoaded = true;
        });
    }

    createCourse(course: CourseModule): Observable<CourseModule> {
        return this.coursesService.createCourse(course).pipe(
            tap(createdCourse => {
                this._courses$.next([...this._courses$.value, createdCourse]);
            })
        );
    }

    editCourse(courseId: number, course: CourseModule): Observable<CourseModule> {
        return this.coursesService.editCourse(courseId, course).pipe(
            tap(updatedCourse => {
                const courses = [...this._courses$.value];
                const courseIndex = courses.findIndex(c => c.id === courseId);
                courses[courseIndex] = updatedCourse;
                this._courses$.next(courses);
            })
        );
    }

    getCourse(courseId: number): Observable<CourseModule> {
        return this.coursesService.getCourse(courseId);
    }

    deleteCourse(courseId: number): Observable<any> {
        return this.coursesService.deleteCourse(courseId).pipe(
            tap(() => {
                const courses = this._courses$.value.filter(c => c.id !== courseId);
                this._courses$.next(courses);
            })
        );
    }
}