import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  baseURL:string

  constructor(private http: HttpClient) { 
    this.baseURL = window.location.origin === 'http://localhost:4200' 
        ? environment.LocalBackend 
        : environment.DeployedBackend;
  }

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
