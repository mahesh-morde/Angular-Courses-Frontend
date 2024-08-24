import { Component, Inject, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  courses: any = {}; // Use an object instead of an array
  id: number | null = null;
  loader: boolean = true; // Initialize loader as true

  constructor(
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseDetailComponent>, // Corrected type here
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    const id = this.data.course_id;
    this.getCourseDetails(id);
  }

  getCourseDetails(id: number): void {
    this.courseService.getCourseById(id).subscribe({
      next: (res: any) => {
        this.courses = res;
        this.loader = false;
        console.log(res)
      },
      error: (err) => {
        this.loader = false;
      }
    });
  }

  goBack(): void {
    this.dialogRef.close(false); 
  }
}
