import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [RouterLink, FormsModule],
    template: `
    <a class="btn btn-outline-secondary mb-4 rounded-pill px-4 fw-bold" routerLink="/"><i class="fa fa-arrow-left me-2"></i>Go Back</a>

    @if (loading) {
      <div class="d-flex justify-content-center my-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    } @else if (error) {
      <div class="alert alert-danger">{{ error }}</div>
    } @else if (product) {
      <div class="row mb-5">
        <div class="col-md-5 mb-4 mb-md-0">
          <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <img [src]="product.image" [alt]="product.name" class="img-fluid bg-white p-4" style="object-fit: contain; max-height: 400px; width: 100%;">
          </div>
        </div>
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="pe-md-4">
            <span class="badge bg-primary mb-2 px-3 py-2 rounded-pill">{{ product.category }}</span>
            <h2 class="fw-bold mb-3">{{ product.name }}</h2>
            <hr>
            <h3 class="fw-bold text-dark my-3">$\{{ product.price.toFixed(2) }}</h3>
            <p class="text-muted fs-5">{{ product.description }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card shadow-sm border-0 rounded-4">
            <ul class="list-group list-group-flush rounded-4">
              <li class="list-group-item p-3">
                <div class="row">
                  <div class="col fw-bold">Price:</div>
                  <div class="col text-end fw-bold">$\{{ product.price.toFixed(2) }}</div>
                </div>
              </li>
              <li class="list-group-item p-3">
                <div class="row">
                  <div class="col fw-bold">Status:</div>
                  <div class="col text-end fw-bold">
                    <span [class]="product.countInStock > 0 ? 'text-success' : 'text-danger'">
                      {{ product.countInStock > 0 ? 'In Stock (' + product.countInStock + ')' : 'Out Of Stock' }}
                    </span>
                  </div>
                </div>
              </li>
              
              @if (product.countInStock > 0) {
                <li class="list-group-item p-3">
                  <div class="row align-items-center">
                    <div class="col fw-bold">Qty:</div>
                    <div class="col">
                      <select class="form-select border-primary" [(ngModel)]="qty">
                        @for (x of [].constructor(product.countInStock); track i; let i = $index) {
                          <option [value]="i + 1">{{ i + 1 }}</option>
                        }
                      </select>
                    </div>
                  </div>
                </li>
              }

              <li class="list-group-item p-3 bg-light rounded-bottom-4">
                <button 
                  class="btn btn-warning w-100 fw-bold rounded-pill shadow-sm"
                  type="button" 
                  [disabled]="product.countInStock === 0"
                  (click)="addToCart()">
                  <i class="fa fa-cart-plus me-2"></i>Add To Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    }
  `
})
export class ProductDetailComponent implements OnInit {
    route = inject(ActivatedRoute);
    productService = inject(ProductService);
    cartService = inject(CartService);

    product: Product | null = null;
    loading = true;
    error = '';
    qty = 1;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.loadProduct(id);
            }
        });
    }

    loadProduct(id: string) {
        this.productService.getProductById(id).subscribe({
            next: (data) => {
                this.product = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Product not found';
                this.loading = false;
                console.error(err);
            }
        });
    }

    addToCart() {
        if (this.product) {
            this.cartService.addToCart(this.product, Number(this.qty));
            // Optional: Add toast notification instead of router navigation
            alert('Item added to cart!');
        }
    }
}
