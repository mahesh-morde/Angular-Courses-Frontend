import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InstanceService } from '../../../services/instance.service';
import { InstanceDetailComponent } from '../instance-detail/instance-detail.component';
import { InstanceCreateComponent } from '../instance-create/instance-create.component';
import { DynamicTableComponent } from '../../../shared/dynamic-table/dynamic-table.component';

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
  years: any[] = [];
  semesters: any[] = [];
  selectedYear: number | null = null;
  allInstanceData: any[] = [];
  spinner: boolean = false;
  @ViewChild(DynamicTableComponent) dynamicTable!: DynamicTableComponent;

  data = ['id', 'course_title', 'course_code', 'year', 'semester'];
  headerList = ['Instance ID', 'Course Title', 'Course Code', 'Year', 'Semester'];

  constructor(
    private instanceService: InstanceService,
    private router: Router,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.instanceForm = this.fb.group({
      year: [null, Validators.required],
      semester: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllInstances()
  }

  onYearChange(event: any): void {
    const selectedYear = event.target.value;
    const semestersSet = new Set<number>();
    this.allInstanceData.forEach(item => {
      if (item.year == selectedYear) {
        semestersSet.add(item.semester);
      }
    });
    this.semesters = Array.from(semestersSet).sort();
    this.instanceForm.patchValue({
      semester: this.semesters[0],
    });
  }

  onSubmit(): void {
    if (this.instanceForm.valid) {
      const { year, semester } = this.instanceForm.value;
      this.getCourseInstances(year, semester);
    } else {
      this.matSnackBar.open('Please enter year and semester', 'ok', { duration: 4000 });
    }
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

  fetchAllInstances() {
    this.getAllInstances();
  }

  viewCourses() {
    this.router.navigateByUrl('courses');
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
        this.years = [...new Set(res.map((inst: any) => inst.year))];
        this.allInstanceData = res;
        const semestersSet = new Set<number>();
        this.allInstanceData.forEach(item => {
          if (item.year == this.allInstanceData[0]?.year) {
            semestersSet.add(item.semester);
          }
        });
        this.semesters = Array.from(semestersSet).sort();
        this.instanceForm.patchValue({
          semester: this.semesters[0],
        });
        this.instanceForm.patchValue({
          year: this.allInstanceData[0]?.year,
          semester: this.semesters[0],
        });
      },
      error: (err) => {
        console.error('Error fetching all instances:', err);
        this.loader = false;
        this.noData = true;
      }
    });
  }

  deleteInstance(id: number): void {
    const instance = this.instances.find(inst => inst.id === id);
    if (instance) {
      this.spinner = true;
      this.instanceService.deleteCourseInstance(instance.year, instance.semester, id).subscribe({
        next: () => {
          this.matSnackBar.open('Instance deleted successfully', 'ok', { duration: 4000 });
          this.instances = this.instances.filter(inst => inst.id !== id);
          this.noData = this.instances.length === 0;
          this.dynamicTable.onDeleteComplete(id);
        },
        error: (err) => {
          console.error('Error deleting instance:', err);
          this.dynamicTable.onDeleteComplete(id);
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
}
