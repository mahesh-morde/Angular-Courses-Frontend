import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { InstanceService } from '../../../services/instance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-instance-create',
  templateUrl: './instance-create.component.html',
  styleUrls: ['./instance-create.component.css']
})
export class InstanceCreateComponent implements OnInit {

  instanceForm: FormGroup;
  courses: any[] = [];
  selectedCourse: any = null;
  loading = false;  // Add loading state
  error: string | null = null; // Add error state

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private instanceService: InstanceService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<InstanceCreateComponent> // Fixed dialogRef type
  ) {
    this.instanceForm = this.fb.group({
      course_code: [null, Validators.required],
      course_title: [{ value: '', disabled: true }], // Disabled input field
      year: [null, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      semester: [null, [Validators.required, Validators.min(1), Validators.max(8)]],
    });
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        this.courses = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.error = 'Failed to load courses. Please try again later.';
        this.loading = false;
      }
    });
  }

  onCourseCodeChange(): void {
    const course_code = this.instanceForm.get('course_code')?.value;
    this.selectedCourse = this.courses.find(course => course.course_code === course_code);
    if (this.selectedCourse) {
      this.instanceForm.patchValue({ course_title: this.selectedCourse.title });
    }
  }

  onSubmit(): void {
    if (this.instanceForm.valid) {
      const { year, semester } = this.instanceForm.value;
      const course_id = this.selectedCourse.id; // The selected course's ID
  
      const dto = {
        year: year,
        semester: semester,
        course: course_id
      };
  
      this.loading = true;  // Set loading state to true
      this.instanceService.createCourseInstance(dto).subscribe({
        next: () => {
          this.matSnackBar.open('Instance created successfully', 'ok', { duration: 4000 });
          this.router.navigate(['/instances']);
          this.loading = false; // Set loading state to false
        },
        error: (err) => {
          console.error('Error creating instance:', err);
          this.matSnackBar.open('Failed to create instance', 'ok', { duration: 4000 });
          this.loading = false; // Set loading state to false
        }
      });
    } else {
      this.matSnackBar.open('Please fill in all required fields', 'ok', { duration: 4000 });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
