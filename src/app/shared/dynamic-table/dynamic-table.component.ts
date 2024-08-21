import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnChanges {
  @Input() columns: string[] = []; // Columns to display, excluding 'actions'
  @Input() headerData: string[] = []; // Headers corresponding to columns
  @Input() dataSource: any[] = []; 

  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();

  displayedColumns: string[] = []; // Columns including 'actions'

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      // Ensure 'actions' is added to the list of columns
      this.displayedColumns = [...this.columns, 'actions'];
    }
  }

  deleteCourse(id: number) {
    this.delete.emit(id);
  }

  viewDetails(id: number) {
    this.view.emit(id);
  }
}
