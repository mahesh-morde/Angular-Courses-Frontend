import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseURL:string

  constructor(private http: HttpClient) { 
    this.baseURL = window.location.origin === 'http://localhost:4200' 
        ? environment.LocalBackend 
        : environment.DeployedBackend;
  }

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
