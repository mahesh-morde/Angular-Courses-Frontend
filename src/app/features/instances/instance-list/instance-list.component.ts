import { Component, OnInit } from '@angular/core';
import { InstanceService } from '../../../services/instance.service';
import { InstanceDetailComponent } from '../instance-detail/instance-detail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstanceCreateComponent } from '../instance-create/instance-create.component';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.css']
})
export class InstanceListComponent implements OnInit {

  instances: any[] = []; 
  noData: boolean = false;
  loader: boolean = false;
  instanceForm: FormGroup;
  data = ['id', 'course_title', 'course_code', 'year', 'semester'];
  headerList = ['Instance ID', 'Course Title', 'Course Code', 'Year', 'Semester'];

  constructor(
    private instanceService: InstanceService,
    private router: Router,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.instanceForm = this.fb.group({
      year: [null, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      semester: [null, [Validators.required, Validators.min(1), Validators.max(8)]]
    });
  }

  ngOnInit(): void {
    this.getAllInstances();
  }

  onSubmit(): void {
    if (this.instanceForm.valid) {
      const { year, semester } = this.instanceForm.value;
      this.getCourseInstances(year, semester);
    } else {
      this.matSnackBar.open('Please enter year and semester', 'ok', { duration: 4000 });
    }
  }

  getAllInstances() {
    this.loader = true;
    this.instanceService.getAllInstances().subscribe({
      next: (res: any) => {
        this.instances = res.map((inst: any) => ({
          id: inst.id,
          course_title: inst.course.title,
          course_code: inst.course.course_code,
          course_description: inst.course.description,
          year: inst.year,
          semester: inst.semester
        }));
        this.loader = false;
        this.noData = this.instances.length === 0;
      },
      error: (err) => {
        console.error('Error fetching all instances:', err);
        this.loader = false;
        this.noData = true;
      }
    });
  }

  getCourseInstances(year: number, semester: number): void {
    this.loader = true;
    this.instanceService.getSpecificCourseInstance(year, semester).subscribe({
      next: (res: any) => {
        this.instances = res.map((inst: any) => ({
          id: inst.id,
          course_title: inst.course.title,
          course_code: inst.course.course_code,
          course_description: inst.course.description,
          year: inst.year,
          semester: inst.semester
        }));
        this.loader = false;
        this.noData = this.instances.length === 0;
      },
      error: (err) => {
        console.error('Error fetching year/sem instances:', err);
        this.loader = false;
        this.noData = true;
      }
    });
  }

  deleteInstance(id: number): void {
    const instance = this.instances.find(inst => inst.id === id);
    if (instance) {
      const { year, semester } = instance;
      this.instanceService.deleteCourseInstance(year, semester, id).subscribe({
        next: () => {
          this.matSnackBar.open('Instance deleted sucessfully', 'ok', { duration: 4000 });
          this.instances = this.instances.filter(inst => inst.id !== id);
          this.noData = this.instances.length === 0;
        },
        error: (err) => {
          console.error('Error deleting instance:', err);
        }
      });
    } else {
      console.error('Instance not found');
    }
  }

  viewDetails(id: number): void {
    const instance = this.instances.find(inst => inst.id === id);
    if (instance) {
      const { year, semester } = instance;
      const dialogRef = this.dialog.open(InstanceDetailComponent, {
        width: '60vw',
        height: '60vh',
        data: {
          course_id: id,
          course_year: year,
          course_semester: semester
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getAllInstances();
        }
      });
    } else {
      console.error('Instance not found');
    }
  }

  createNewInstance() {
    const dialogRef = this.dialog.open(InstanceCreateComponent, {
      width: '60vw',
      height: '70vh',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllInstances();
    });
  }
  
  

  fetchAllInstances() {
    this.getAllInstances();
  }

  viewCourses(){
    this.router.navigateByUrl('courses');
  }
}
