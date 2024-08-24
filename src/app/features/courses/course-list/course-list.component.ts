import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseCreateComponent } from '../course-create/course-create.component';
import { DynamicTableComponent } from '../../../shared/dynamic-table/dynamic-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  data = ['id', 'title', 'course_code', 'description'];
  headerList = ['Course ID', 'Course Title', 'Course Code', 'Description'];

  noData: boolean = false;
  loader: boolean = false;
  spinner: boolean = false;
  @ViewChild(DynamicTableComponent) dynamicTable!: DynamicTableComponent;

  constructor(
    private courseService: CourseService,
    private router: Router,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.loader = true;
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        this.courses = res;
        this.loader = false;
        this.noData = this.courses.length === 0;
      },
      error: (err) => {
        this.loader = false;
        this.noData = true;
      }
    });
  }

  deleteCourse(id: number) {
    this.spinner = true;
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.matSnackBar.open('Course deleted successfully', 'ok', { duration: 4000 });
        this.getAllCourses();
        this.spinner = false;
      },
      error: (err) => {
        this.matSnackBar.open('Oops Please try again after sometime', 'ok', { duration: 4000 });
        this.spinner = false;
      }
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
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllCourses();
      }
    });
  }

  createNewCourse() {
    const dialogRef = this.dialog.open(CourseCreateComponent, {
      width: '60vw',
      height: '70vh',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllCourses();
    });
  }

  viewInstances() {
    this.router.navigateByUrl('instances');
  }
}
