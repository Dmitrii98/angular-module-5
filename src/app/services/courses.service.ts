import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private apiUrl = 'http://your-backend-api-url.com/api/courses';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}`);
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`${this.apiUrl}`, course);
    }

    editCourse(courseId: number, course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.apiUrl}/${courseId}`, course);
    }

    getCourse(courseId: number): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/${courseId}`);
    }

    deleteCourse(courseId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${courseId}`);
    }
}