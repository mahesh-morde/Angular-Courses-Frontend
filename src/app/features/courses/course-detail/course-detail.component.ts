import { Component, Inject, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  courses: any = {};
  id: number | null = null;
  loader: boolean = true;

  constructor(
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const id = this.data.course_id;
      this.getCourseDetails(id);
    }
  }

  getCourseDetails(id: number): void {
    this.courseService.getCourseById(id).subscribe({
      next: (res: any) => {
        this.courses = res;
        this.loader = false;
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
