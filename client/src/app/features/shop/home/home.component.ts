import { Component, inject, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../core/services/product.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="container-fluid mt-2 px-2 px-md-3">
      
      <!-- Flipkart Categories Ribbon -->
      <div class="bg-white py-3 pb-2 mb-3 shadow-sm d-flex justify-content-between text-center overflow-auto category-scroll" style="border-radius: 2px;">
        <div class="px-3 px-md-4 cursor-pointer category-item">
            <div class="category-icon"><img src="https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100" height="64" width="64" alt="Grocery"></div>
            <div class="fw-bold mt-2 text-dark" style="font-size: 14px;">Grocery</div>
        </div>
        <div class="px-3 px-md-4 cursor-pointer category-item">
            <div class="category-icon"><img src="https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100" height="64" width="64" alt="Mobiles"></div>
            <div class="fw-bold mt-2 text-dark" style="font-size: 14px;">Mobiles</div>
        </div>
        <div class="px-3 px-md-4 cursor-pointer category-item">
            <div class="category-icon"><img src="https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100" height="64" width="64" alt="Fashion"></div>
            <div class="fw-bold mt-2 text-dark" style="font-size: 14px;">Fashion</div>
        </div>
        <div class="px-3 px-md-4 cursor-pointer category-item">
            <div class="category-icon"><img src="https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100" height="64" width="64" alt="Electronics"></div>
            <div class="fw-bold mt-2 text-dark" style="font-size: 14px;">Electronics</div>
        </div>
        <div class="px-3 px-md-4 cursor-pointer category-item">
            <div class="category-icon"><img src="https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100" height="64" width="64" alt="Home & Furniture"></div>
            <div class="fw-bold mt-2 text-dark" style="font-size: 14px;">Home & Furniture</div>
        </div>
        <div class="px-3 px-md-4 cursor-pointer category-item">
            <div class="category-icon"><img src="https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0139228b2f7eb413.jpg?q=100" height="64" width="64" alt="Appliances"></div>
            <div class="fw-bold mt-2 text-dark" style="font-size: 14px;">Appliances</div>
        </div>
        <div class="px-3 px-md-4 cursor-pointer category-item d-none d-md-block">
            <div class="category-icon"><img src="https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100" height="64" width="64" alt="Travel"></div>
            <div class="fw-bold mt-2 text-dark" style="font-size: 14px;">Travel</div>
        </div>
        <div class="px-3 px-md-4 cursor-pointer category-item d-none d-lg-block">
            <div class="category-icon"><img src="https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100" height="64" width="64" alt="Beauty, Toys"></div>
            <div class="fw-bold mt-2 text-dark" style="font-size: 14px;">Beauty, Toys</div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="bg-white shadow-sm mb-5" style="border-radius: 2px;">
        <div class="p-3 border-bottom d-flex justify-content-between align-items-center">
          <h4 class="mb-0 fw-bold">Best of ShopSmart</h4>
          <button class="btn btn-primary rounded-1 shadow-sm px-4 fw-bold" style="background-color: var(--fk-blue); border: none;">VIEW ALL</button>
        </div>
        <div class="p-3">
          @if (loading) {
            <div class="d-flex justify-content-center my-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          } @else if (error) {
            <div class="alert alert-danger">{{ error }}</div>
          } @else {
            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-2 g-md-3">
              @for (product of products; track product._id) {
                <div class="col">
                  <app-product-card [product]="product"></app-product-card>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .category-item {
      transition: color 0.2s;
    }
    .category-item:hover .text-dark {
      color: var(--fk-blue) !important;
    }
    .category-scroll::-webkit-scrollbar {
      display: none;
    }
    .category-scroll {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `]
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  products: Product[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
