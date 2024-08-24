import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstanceListComponent } from '../instance-list/instance-list.component';
import { InstanceService } from '../../../services/instance.service';
@Component({
  selector: 'app-instance-detail',
  templateUrl: './instance-detail.component.html',
  styleUrl: './instance-detail.component.css'
})
export class InstanceDetailComponent implements OnInit {
  year: number | null = null;
  semester: number | null = null;
  id: number | null = null;
  instance: any = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private instanceService: InstanceService,
    private dialogRef: MatDialogRef<InstanceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.id = this.data.course_id;
    this.year = this.data.course_year;
    this.semester = this.data.course_semester;
    if (this.year && this.semester && this.id) {
      this.fetchInstanceDetails();
    } else {
      this.error = 'Invalid parameters';
      this.loading = false;
    }
  }

  fetchInstanceDetails(): void {
    if (this.year && this.semester && this.id) {
      this.instanceService.getSpecificCourseInstance(this.year, this.semester).subscribe(
        (data: any) => {
          this.instance = data.find((item: any) => item.id === this.id);
          console.log(this.instance)
          this.loading = false;
        },
        (err: any) => {
          this.error = 'Failed to load instance details';
          this.loading = false;
        }
      );
    }
  }

  goBack(): void {
    this.dialogRef.close(false); 
  }
}
