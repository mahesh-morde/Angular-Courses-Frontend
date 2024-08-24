import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
})
export class CourseCreateComponent implements OnInit {
  courseForm: FormGroup;
  loading = false; // To manage loading spinner
  error: string | null = null; // For error messages

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseCreateComponent>,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      course_code: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Additional initialization logic can be added here if needed
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.loading = true; // Show spinner when submitting
      this.courseService.createCourse(this.courseForm.value).subscribe(
        (res: any) => {
          this.loading = false; // Hide spinner
          this.dialogRef.close(true); // Close dialog on success
          this.router.navigate(['/courses']); // Navigate to courses list or another page
        },
        (error) => {
          this.loading = false; // Hide spinner
          this.error = 'Error creating course. Please try again.'; // Set error message
          console.error('Error creating course:', error);
        }
      );
    }
  }

  goBack(): void {
    this.dialogRef.close(false);
  }
}
