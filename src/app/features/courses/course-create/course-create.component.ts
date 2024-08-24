import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
})
export class CourseCreateComponent implements OnInit {
  courseForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseCreateComponent>,
    private matSnackBar: MatSnackBar,

  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      course_code: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.loading = true;
      this.courseService.createCourse(this.courseForm.value).subscribe(
        (res: any) => {
          this.loading = false;
          this.matSnackBar.open('Course Added Successfully', 'ok', { duration: 4000 });
          this.dialogRef.close(true); 
          this.courseForm.reset();  
        },
        (error) => {
          this.loading = false;
          let errorMsg = 'Error creating course. Please try again';
          if (error.status === 400) {
            errorMsg = 'Course code already exists. Please use a different code.';
          }
          this.matSnackBar.open(errorMsg, 'ok', { duration: 4000 });
        }
      );
    }
  }
  

  goBack(): void {
    this.dialogRef.close(false);
  }
}
