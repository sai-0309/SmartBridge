import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <h2 class="fw-bold mb-4">Shopping Cart</h2>
    
    @if (cartService.cartItems().length === 0) {
      <div class="alert alert-info py-4 text-center rounded-4 fs-5">
        Your cart is empty <a routerLink="/" class="alert-link fw-bold ms-2">Go Back</a>
      </div>
    } @else {
      <div class="row">
        <div class="col-md-8">
          <div class="list-group shadow-sm rounded-4 mb-4">
            @for (item of cartService.cartItems(); track item._id) {
              <div class="list-group-item p-4">
                <div class="row align-items-center">
                  <div class="col-md-2 mb-3 mb-md-0">
                    <img [src]="item.image" [alt]="item.name" class="img-fluid rounded bg-light p-2 w-100" style="max-height: 80px; object-fit: contain;">
                  </div>
                  <div class="col-md-3">
                    <a [routerLink]="['/product', item._id]" class="text-decoration-none fw-bold text-dark fs-5">{{ item.name }}</a>
                  </div>
                  <div class="col-md-2 fw-bold text-primary fs-5 mt-2 mt-md-0">
                    $\{{ item.price.toFixed(2) }}
                  </div>
                  <div class="col-md-3 mt-3 mt-md-0">
                    <select class="form-select border-primary" [ngModel]="item.qty" (ngModelChange)="updateCart(item, $event)">
                      @for (x of [].constructor(item.countInStock); track i; let i = $index) {
                        <option [value]="i + 1">{{ i + 1 }}</option>
                      }
                    </select>
                  </div>
                  <div class="col-md-2 text-md-end mt-3 mt-md-0">
                    <button type="button" class="btn btn-outline-danger btn-sm rounded-circle px-2 shadow-sm" (click)="removeFromCart(item._id)">
                      <i class="fa fa-trash fs-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-body p-4">
              <h4 class="fw-bold mb-3 border-bottom pb-2 text-center text-md-start">
                Subtotal ({{ cartItemsCount() }}) items
              </h4>
              <h2 class="fw-bold text-primary mb-4 text-center text-md-start">$\{{ cartService.cartSubtotal().toFixed(2) }}</h2>
              <button 
                type="button" 
                class="btn btn-warning w-100 fw-bold rounded-pill p-3 fs-5 shadow-sm" 
                [disabled]="cartService.cartItems().length === 0"
                (click)="checkout()">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class CartComponent {
  cartService = inject(CartService);
  router = inject(Router);
  location = inject(Location);

  cartItemsCount() {
    return this.cartService.cartItems().reduce((acc, item) => acc + item.qty, 0);
  }

  updateCart(item: any, qty: any) {
    this.cartService.addToCart(item, Number(qty));
  }

  removeFromCart(id: string) {
    this.cartService.removeFromCart(id);
  }

  checkout() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/shipping' } });
  }
}
