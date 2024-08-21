import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InstanceService {

baseURL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getAllInstances(){
    return this.http.get(`${this.baseURL}/api/instances/`);
  }

  getSpecificCourseInstance(year: number, semester: number) {
    return this.http.get(`${this.baseURL}/api/instances/${year}/${semester}/`);
  }

  createCourseInstance(dto: any) {
    return this.http.post(`${this.baseURL}/api/instances/create/`, dto);
  }

  deleteCourseInstance(year: number, semester: number, id: number) {
    return this.http.delete(`${this.baseURL}/api/instances/${year}/${semester}/${id}/`);
  }
}
