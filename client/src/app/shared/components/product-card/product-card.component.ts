import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="['/product', product._id]" class="card h-100 shadow-none border-0 product-card text-decoration-none text-center p-3 rounded-1">
      <div class="img-container mb-3 position-relative mx-auto">
        <img [src]="product.image" class="product-img img-fluid" [alt]="product.name">
      </div>
      <div class="card-body p-0 d-flex flex-column align-items-center">
        <p class="card-title fw-semibold text-truncate w-100 text-dark mb-1" style="font-size: 14px;">{{ product.name }}</p>
        <p class="card-text small mb-2 text-success fw-medium">{{ product.category }}</p>
        <div class="mt-auto">
          <h5 class="mb-0 fw-bold text-dark w-100 text-center">$\{{ product.price.toFixed(2) }}</h5>
        </div>
      </div>
    </a>
  `,
  styles: [`
    .product-card {
      transition: box-shadow 0.2s ease-in-out;
      cursor: pointer;
    }
    .product-card:hover {
      box-shadow: 0 3px 16px 0 rgba(0,0,0,.11) !important;
    }
    .img-container {
      height: 150px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .product-img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      transition: transform 0.2s ease-in-out;
    }
    .product-card:hover .product-img {
      transform: scale(1.05);
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
}
