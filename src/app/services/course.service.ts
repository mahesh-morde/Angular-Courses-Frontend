import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseURL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get(`${this.baseURL}/api/courses/`);
  }

  getCourseById(id: number) {
    return this.http.get(`${this.baseURL}/api/courses/${id}/`);
  }

  createCourse(dto: any) {
    return this.http.post(`${this.baseURL}/api/courses/`, dto);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.baseURL}/api/courses/${id}/`);
  }
  
  
}
