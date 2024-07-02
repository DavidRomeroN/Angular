import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule, ModalComponent,ProductCreateComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  private productService=inject(ProductService);
  products=signal<Product[]>([]);

  isModalOpen=false;
  product!:Product;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data.data);
        console.log(data.data);
      },
      error: () => {},
    });
  }

  loadProduct(product: Product) {
    this.product = product;
    this.openModal();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        //this.toastr.success('Registro eliminado');
        this.getProducts();
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.getProducts();
  }



}

