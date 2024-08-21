import { Component, Inject, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InstanceListComponent } from '../../instances/instance-list/instance-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {

  courses: any = new Array();
  id: number | null = null;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<InstanceListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    const id = this.data.course_id;
    this.getCourseDetails(id)
  }

  getCourseDetails(id: any){
    this.courseService.getCourseById(id).subscribe((res: any) => {
    this.courses = res;
    console.log("courses :", this.courses)
  });
}

goBack(): void {
  this.dialogRef.close(false); 
}
}
