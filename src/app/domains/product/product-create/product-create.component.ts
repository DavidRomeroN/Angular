import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product';
import { ProductService } from '../../../service/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  @Input() data: Product | null = null;
  @Output() onCloseModal = new EventEmitter();
  dataForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.dataForm = this.fb.group({
      tipo_producto: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(): void {
    if (this.data) {
      this.dataForm.patchValue({
        tipo_producto: this.data.tipo_producto,
        nombre: this.data.nombre,
        descripcion: this.data.descripcion,
        precio: this.data.precio,
      });
    }
  }

  onSubmit() {
    if (this.dataForm.valid) {
      if (this.data) {
        this.productService.updateProduct(this.data.id, this.dataForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetdataForm();
              //this.toastr.success("Registro actualizado!");
            },
          });

      } else {
        this.productService.createProduct(this.dataForm.value).subscribe({
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
