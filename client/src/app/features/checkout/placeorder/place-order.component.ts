import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
    selector: 'app-place-order',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="row mb-5">
      <div class="col-12 px-2 pb-4">
        <!-- Checkout Steps -->
        <div class="d-flex justify-content-center mb-4 px-3 position-relative" style="max-width: 500px; margin: 0 auto;">
          <div class="progress position-absolute top-50 start-0 w-100 translate-middle-y" style="height: 2px; z-index: -1;">
            <div class="progress-bar bg-primary" role="progressbar" style="width: 100%"></div>
          </div>
          <div class="text-center bg-light px-2 position-absolute start-0 translate-middle-y top-50">
            <div class="btn btn-primary rounded-circle mb-1" style="width: 32px; height: 32px;"><i class="fa fa-check"></i></div>
            <div class="small text-primary d-none d-md-block">Shipping</div>
          </div>
          <div class="text-center bg-light px-2 position-absolute start-50 translate-middle">
            <div class="btn btn-primary rounded-circle mb-1" style="width: 32px; height: 32px;"><i class="fa fa-check"></i></div>
            <div class="small text-primary d-none d-md-block">Payment</div>
          </div>
          <div class="text-center bg-light px-2 position-absolute end-0 translate-middle-y top-50">
            <div class="btn btn-primary rounded-circle mb-1" style="width: 32px; height: 32px;"><i class="fa fa-shopping-bag"></i></div>
            <div class="small fw-bold text-primary d-none d-md-block">Order</div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card shadow-sm border-0 rounded-4 mb-4">
          <div class="card-body p-4">
            <h4 class="fw-bold mb-3 border-bottom pb-3">Shipping Summary</h4>
            <p class="mb-0 fs-5">
              <strong>Address:</strong>
              {{ cartService.shippingAddress().address }}, {{ cartService.shippingAddress().city }},
              {{ cartService.shippingAddress().postalCode }}, {{ cartService.shippingAddress().country }}
            </p>
          </div>
        </div>

        <div class="card shadow-sm border-0 rounded-4 mb-4">
          <div class="card-body p-4">
            <h4 class="fw-bold mb-3 border-bottom pb-3">Payment Method</h4>
            <p class="mb-0 fs-5">
              <strong>Method:</strong> {{ cartService.paymentMethod() }}
            </p>
          </div>
        </div>

        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-4">
            <h4 class="fw-bold mb-3 border-bottom pb-3">Order Items</h4>
            @if (cartService.cartItems().length === 0) {
              <div class="alert alert-info">Your cart is empty</div>
            } @else {
              <div class="list-group list-group-flush">
                @for (item of cartService.cartItems(); track item._id) {
                  <div class="list-group-item px-0 py-3">
                    <div class="row align-items-center">
                      <div class="col-md-2">
                        <img [src]="item.image" [alt]="item.name" class="img-fluid rounded bg-light p-1" style="max-height: 50px; object-fit: contain;">
                      </div>
                      <div class="col-md-6">
                        <a [routerLink]="['/product', item._id]" class="text-decoration-none fw-bold text-dark">{{ item.name }}</a>
                      </div>
                      <div class="col-md-4 text-md-end text-muted fw-bold">
                        {{ item.qty }} x $\{{ item.price.toFixed(2) }} = $\{{ (item.qty * item.price).toFixed(2) }}
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>

      <div class="col-md-4 mt-4 mt-md-0">
        <div class="card shadow-sm border-0 rounded-4 sticky-top" style="top: 100px;">
          <div class="card-body p-4">
            <h4 class="fw-bold mb-4 border-bottom pb-3 text-center text-md-start">Order Summary</h4>
            <div class="d-flex justify-content-between mb-3 fs-5">
              <span class="text-muted">Items</span>
              <span class="fw-bold">$\{{ itemsPrice.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 fs-5">
              <span class="text-muted">Shipping</span>
              <span class="fw-bold">$\{{ shippingPrice.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 fs-5">
              <span class="text-muted">Tax</span>
              <span class="fw-bold">$\{{ taxPrice.toFixed(2) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-4 fs-4 text-primary fw-bold">
              <span>Total</span>
              <span>$\{{ totalPrice.toFixed(2) }}</span>
            </div>

            @if (error) {
              <div class="alert alert-danger">{{ error }}</div>
            }

            <button 
              type="button" 
              class="btn btn-warning w-100 fw-bold rounded-pill p-3 fs-5 shadow-sm"
              [disabled]="cartService.cartItems().length === 0"
              (click)="placeOrder()">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PlaceOrderComponent {
    cartService = inject(CartService);
    orderService = inject(OrderService);
    router = inject(Router);

    itemsPrice = 0;
    shippingPrice = 0;
    taxPrice = 0;
    totalPrice = 0;
    error = '';

    ngOnInit() {
        if (!this.cartService.shippingAddress().address) {
            this.router.navigate(['/shipping']);
        } else if (!this.cartService.paymentMethod()) {
            this.router.navigate(['/payment']);
        }

        this.calculatePrices();
    }

    calculatePrices() {
        this.itemsPrice = this.cartService.cartItems().reduce((acc, item) => acc + item.price * item.qty, 0);
        this.shippingPrice = this.itemsPrice > 100 ? 0 : 10;
        this.taxPrice = Number((0.15 * this.itemsPrice).toFixed(2));
        this.totalPrice = Number((this.itemsPrice + this.shippingPrice + this.taxPrice).toFixed(2));
    }

    placeOrder() {
        this.error = '';
        const orderItems = this.cartService.cartItems().map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id
        }));

        this.orderService.createOrder({
            orderItems,
            shippingAddress: this.cartService.shippingAddress(),
            paymentMethod: this.cartService.paymentMethod(),
            itemsPrice: this.itemsPrice,
            shippingPrice: this.shippingPrice,
            taxPrice: this.taxPrice,
            totalPrice: this.totalPrice
        }).subscribe({
            next: (res) => {
                this.cartService.clearCart();
                this.router.navigate([`/order/${res._id}`]);
            },
            error: (err) => {
                this.error = err.error?.message || 'Error creating order';
            }
        });
    }
}
