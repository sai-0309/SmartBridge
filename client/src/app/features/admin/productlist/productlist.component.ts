import { Component, inject, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../core/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Products List</h2>
      <button class="btn btn-primary fw-bold rounded-pill px-4" (click)="createProduct()">
        <i class="fa fa-plus me-2"></i> Create Product
      </button>
    </div>

    @if (loading) {
      <div class="d-flex justify-content-center my-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    } @else if (error) {
      <div class="alert alert-danger">{{ error }}</div>
    } @else {
      <div class="table-responsive bg-white rounded-4 shadow-sm p-3">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">PRICE</th>
              <th scope="col">CATEGORY</th>
              <th scope="col" class="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            @for (product of products; track product._id) {
              <tr>
                <td class="text-muted fw-bold">{{ product._id.substring(0, 8) }}...</td>
                <td class="fw-bold">{{ product.name }}</td>
                <td>$\{{ product.price.toFixed(2) }}</td>
                <td>{{ product.category }}</td>
                <td class="text-end">
                  <!-- Note: Actual edit page needs to be created -->
                  <a href="javascript:void(0)" class="btn btn-sm btn-outline-primary rounded-circle shadow-sm me-2" title="Edit">
                    <i class="fa fa-edit"></i>
                  </a>
                  <button class="btn btn-sm btn-outline-danger rounded-circle shadow-sm" (click)="deleteProduct(product._id)" title="Delete">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `
})
export class ProductListComponent implements OnInit {
    productService = inject(ProductService);

    products: Product[] = [];
    loading = true;
    error = '';

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.loading = true;
        this.productService.getProducts().subscribe({
            next: (data) => {
                this.products = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error fetching products';
                this.loading = false;
            }
        });
    }

    createProduct() {
        alert('Create Product Component needs to be routed here.');
        // In actual app, this implies creating an empty product or routing to a form.
    }

    deleteProduct(id: string) {
        if (confirm('Are you sure you want to delete this product?')) {
            // Assuming a delete method on ProductService. Needs to be implemented.
            alert('Deleted product ' + id);
            // In a full implementation, you'd subscribe to deleteProduct and then call this.loadProducts();
        }
    }
}
