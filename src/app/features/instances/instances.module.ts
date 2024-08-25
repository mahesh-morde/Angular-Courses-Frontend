import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';
import { InstanceCreateComponent } from './instance-create/instance-create.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Corrected import
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { InstanceRoutingModule } from './instance-routing.module';

@NgModule({
  declarations: [
    InstanceListComponent,
    InstanceDetailComponent,
    InstanceCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    InstanceRoutingModule
  ]
})
export class InstancesModule { }
