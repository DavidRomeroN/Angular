import { Component, inject, signal } from '@angular/core';
import { Table } from '../../../models/table';
import { TableService } from '../../../service/table.service';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  private tableService=inject(TableService);
  tables=signal<Table[]>([]);

  isModalOpen=false;
  table!:Table;

  ngOnInit() {
    this.getTables();
  }

  getTables() {
    this.tableService.getAll().subscribe({
      next: (data) => {
        this.tables.set(data.data);
        console.log(data.data);
      },
      error: () => {},
    });
  }

  loadTable(table: Table) {
    this.table = table;
    this.openModal();
  }

  deleteTable(id: number) {
    this.tableService.deleteTable(id).subscribe({
      next: (response) => {
        //this.toastr.success('Registro eliminado');
        this.getTables();
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.getTables();
  }
}
