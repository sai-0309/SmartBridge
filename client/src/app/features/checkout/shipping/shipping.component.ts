import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-shipping',
    standalone: true,
    imports: [FormsModule],
    template: `
    <div class="row justify-content-center my-5">
      <div class="col-md-6 col-lg-5">
        
        <!-- Checkout Steps -->
        <div class="d-flex justify-content-between mb-5 px-3 position-relative">
          <div class="progress position-absolute top-50 start-0 w-100 translate-middle-y" style="height: 2px; z-index: -1;">
            <div class="progress-bar bg-primary" role="progressbar" style="width: 33%"></div>
          </div>
          <div class="text-center bg-light px-2">
            <div class="btn btn-primary rounded-circle mb-1" style="width: 32px; height: 32px;"><i class="fa fa-map-marker"></i></div>
            <div class="small fw-bold text-primary">Shipping</div>
          </div>
          <div class="text-center bg-light px-2">
            <div class="btn btn-secondary rounded-circle mb-1" style="width: 32px; height: 32px;">2</div>
            <div class="small text-muted">Payment</div>
          </div>
          <div class="text-center bg-light px-2">
            <div class="btn btn-secondary rounded-circle mb-1" style="width: 32px; height: 32px;">3</div>
            <div class="small text-muted">Order</div>
          </div>
        </div>

        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-5">
            <h2 class="fw-bold text-center mb-4">Shipping Address</h2>
            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="address" class="form-label fw-bold">Address</label>
                <input type="text" class="form-control p-3 bg-light border-0 rounded-3" id="address" [(ngModel)]="address" name="address" required>
              </div>
              <div class="mb-3">
                <label for="city" class="form-label fw-bold">City</label>
                <input type="text" class="form-control p-3 bg-light border-0 rounded-3" id="city" [(ngModel)]="city" name="city" required>
              </div>
              <div class="mb-3">
                <label for="postalCode" class="form-label fw-bold">Postal Code</label>
                <input type="text" class="form-control p-3 bg-light border-0 rounded-3" id="postalCode" [(ngModel)]="postalCode" name="postalCode" required>
              </div>
              <div class="mb-4">
                <label for="country" class="form-label fw-bold">Country</label>
                <input type="text" class="form-control p-3 bg-light border-0 rounded-3" id="country" [(ngModel)]="country" name="country" required>
              </div>
              <button type="submit" class="btn btn-primary w-100 rounded-pill p-3 fw-bold shadow-sm">
                Continue to Payment <i class="fa fa-arrow-right ms-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ShippingComponent {
    cartService = inject(CartService);
    router = inject(Router);

    address = '';
    city = '';
    postalCode = '';
    country = '';

    ngOnInit() {
        const shippingAddress = this.cartService.shippingAddress();
        if (shippingAddress) {
            this.address = shippingAddress.address || '';
            this.city = shippingAddress.city || '';
            this.postalCode = shippingAddress.postalCode || '';
            this.country = shippingAddress.country || '';
        }
    }

    onSubmit() {
        this.cartService.saveShippingAddress({
            address: this.address,
            city: this.city,
            postalCode: this.postalCode,
            country: this.country,
        });
        this.router.navigate(['/payment']);
    }
}
