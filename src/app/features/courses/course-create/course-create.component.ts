import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { InstanceListComponent } from '../../instances/instance-list/instance-list.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrl: './course-create.component.css',
})
export class CourseCreateComponent implements OnInit {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<InstanceListComponent>
  ) {
    this.courseForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      course_code: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      this.courseService.createCourse(formData).subscribe(
        (res: any) => {
          console.log('courses :', res);
          this.courseForm.reset();
        },
        (error) => {
          console.error('Error creating course:', error);
        }
      );
    }
  }

  goBack(): void {
    this.dialogRef.close(false);
  }
}
