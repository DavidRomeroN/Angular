import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from '../../../models/table';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableService } from '../../../service/table.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './table-create.component.html',
  styleUrl: './table-create.component.css'
})
export class TableCreateComponent {
  @Input() data: Table | null = null;
  @Output() onCloseModal = new EventEmitter();
  dataForm!: FormGroup;

  constructor(private fb: FormBuilder, private tableService: TableService) {
    this.dataForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      slug: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(): void {
    if (this.data) {
      this.dataForm.patchValue({
        numero: this.data.numero,
        aforo: this.data.aforo,
      });
    }
  }

  onSubmit() {
    if (this.dataForm.valid) {
      if (this.data) {
        this.tableService.updateTable(this.data.id, this.dataForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetdataForm();
              //this.toastr.success("Registro actualizado!");
            },
          });

      } else {
        this.tableService.createTable(this.dataForm.value).subscribe({
          next: (response: any) => {
            this.resetdataForm();
            //this.toastr.success('Registro creado!');
          },
        });
      }
    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  onClose() {
    this.onCloseModal.emit(false);
  }

  resetdataForm() {
    this.dataForm.reset();
    this.onClose();
  }
}
