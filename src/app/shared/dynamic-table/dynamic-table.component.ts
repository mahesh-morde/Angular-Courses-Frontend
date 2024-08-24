import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnChanges {
  @Input() columns: string[] = []; 
  @Input() headerData: string[] = []; 
  @Input() dataSource: any[] = []; 
  @Input() spinner: boolean = false;

  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();

  displayedColumns: string[] = [];
  loadingStates: { [key: number]: boolean } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.displayedColumns = ['serialNumber', ...this.columns, 'actions'];
    }
  }

  deleteCourse(id: number) {
    this.loadingStates[id] = true;
    this.delete.emit(id);
  }

  viewDetails(id: number) {
    this.view.emit(id);
  }

  onDeleteComplete(id: number) {
    this.loadingStates[id] = false;
  }
}
