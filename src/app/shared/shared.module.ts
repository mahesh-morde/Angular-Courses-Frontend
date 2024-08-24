import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NullScreenComponent } from './null-screen/null-screen.component';
@NgModule({
  declarations: [
    DynamicTableComponent,
    NullScreenComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
  ],
  exports:[
    DynamicTableComponent,
    NullScreenComponent,
  ]
})
export class SharedModule { }
