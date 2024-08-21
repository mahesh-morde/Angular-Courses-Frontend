import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseCreateComponent } from '../course-create/course-create.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  data = ['id', 'title', 'course_code', 'description']; // Columns to match course data
  headerList = ['Course ID', 'Course Title', 'Course Code', 'Description']; // Headers for these columns

  noData: boolean = false;
  loader: boolean = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.loader = true;
    this.courseService.getCourses().subscribe((res: any) => {
      this.courses = res;
      this.loader = false;
      this.noData = this.courses.length === 0;
    });
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.getAllCourses(); // Refresh the list after deletion
    });
  }

  viewDetails(id: number): void {
    const dialogRef = this.dialog.open(CourseDetailComponent, {
      width: '60vw',
      height: '60vh',
      data: {
        course_id: id,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllCourses();
    });
  }

  createNewCourse() {

    const dialogRef = this.dialog.open(CourseCreateComponent, {
      width: '60vw',
      height: '60vh',
    
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllCourses();
    });
  }
}
