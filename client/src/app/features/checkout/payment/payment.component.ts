import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [FormsModule],
    template: `
    <div class="row justify-content-center my-5">
      <div class="col-md-6 col-lg-5">
        
        <!-- Checkout Steps -->
        <div class="d-flex justify-content-between mb-5 px-3 position-relative">
          <div class="progress position-absolute top-50 start-0 w-100 translate-middle-y" style="height: 2px; z-index: -1;">
            <div class="progress-bar bg-primary" role="progressbar" style="width: 66%"></div>
          </div>
          <div class="text-center bg-light px-2">
            <div class="btn btn-primary rounded-circle mb-1" style="width: 32px; height: 32px;"><i class="fa fa-check"></i></div>
            <div class="small text-primary">Shipping</div>
          </div>
          <div class="text-center bg-light px-2">
            <div class="btn btn-primary rounded-circle mb-1" style="width: 32px; height: 32px;"><i class="fa fa-credit-card"></i></div>
            <div class="small fw-bold text-primary">Payment</div>
          </div>
          <div class="text-center bg-light px-2">
            <div class="btn btn-secondary rounded-circle mb-1" style="width: 32px; height: 32px;">3</div>
            <div class="small text-muted">Order</div>
          </div>
        </div>

        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-5">
            <h2 class="fw-bold text-center mb-4">Payment Method</h2>
            <form (ngSubmit)="onSubmit()">
              <div class="mb-4">
                <label class="form-label fw-bold mb-3">Select Method</label>
                <div class="form-check mb-3 p-3 bg-light rounded-3 d-flex align-items-center cursor-pointer">
                  <input class="form-check-input ms-2 me-3" type="radio" id="Stripe" value="Stripe" [(ngModel)]="paymentMethod" name="paymentMethod">
                  <label class="form-check-label w-100 fw-bold d-flex align-items-center" for="Stripe">
                    <i class="fa fa-cc-stripe text-primary fa-2x me-3"></i> Stripe (Credit Card)
                  </label>
                </div>
                <div class="form-check p-3 bg-light rounded-3 d-flex align-items-center cursor-pointer">
                  <input class="form-check-input ms-2 me-3" type="radio" id="COD" value="COD" [(ngModel)]="paymentMethod" name="paymentMethod">
                  <label class="form-check-label w-100 fw-bold d-flex align-items-center" for="COD">
                    <i class="fa fa-money text-success fa-2x me-3"></i> Cash On Delivery
                  </label>
                </div>
              </div>
              
              <button type="submit" class="btn btn-primary w-100 rounded-pill p-3 fw-bold shadow-sm mt-2">
                Continue to Order <i class="fa fa-arrow-right ms-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PaymentComponent {
    cartService = inject(CartService);
    router = inject(Router);

    paymentMethod = 'Stripe';

    ngOnInit() {
        const shippingAddress = this.cartService.shippingAddress();
        if (!shippingAddress.address) {
            this.router.navigate(['/shipping']);
        } else {
            this.paymentMethod = this.cartService.paymentMethod();
        }
    }

    onSubmit() {
        this.cartService.savePaymentMethod(this.paymentMethod);
        this.router.navigate(['/placeorder']);
    }
}
