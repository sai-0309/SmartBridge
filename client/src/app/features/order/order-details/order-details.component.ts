import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-order-details',
    standalone: true,
    imports: [RouterLink, DatePipe],
    template: `
    <h2 class="fw-bold mb-4">Order <span class="text-primary">#{{ orderId }}</span></h2>
    @if (loading) {
      <div class="d-flex justify-content-center my-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    } @else if (error) {
      <div class="alert alert-danger">{{ error }}</div>
    } @else if (order) {
      <div class="row">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0 rounded-4 mb-4">
            <div class="card-body p-4">
              <h4 class="fw-bold mb-3 border-bottom pb-3">Shipping Summary</h4>
              <p class="mb-1 fs-5"><strong>Name:</strong> {{ order.user.name }}</p>
              <p class="mb-3 fs-5">
                <strong>Email:</strong> <a [href]="'mailto:' + order.user.email">{{ order.user.email }}</a>
              </p>
              <p class="mb-3 fs-5">
                <strong>Address:</strong>
                {{ order.shippingAddress.address }}, {{ order.shippingAddress.city }},
                {{ order.shippingAddress.postalCode }}, {{ order.shippingAddress.country }}
              </p>
              
              @if (order.isDelivered) {
                <div class="alert alert-success fs-5 py-2">
                  Delivered on {{ order.deliveredAt | date:'medium' }}
                </div>
              } @else {
                <div class="alert alert-danger fs-5 py-2">Not Delivered</div>
              }
            </div>
          </div>

          <div class="card shadow-sm border-0 rounded-4 mb-4">
            <div class="card-body p-4">
              <h4 class="fw-bold mb-3 border-bottom pb-3">Payment Method</h4>
              <p class="mb-3 fs-5">
                <strong>Method:</strong> {{ order.paymentMethod }}
              </p>
              
              @if (order.isPaid) {
                <div class="alert alert-success fs-5 py-2">
                  Paid on {{ order.paidAt | date:'medium' }}
                </div>
              } @else {
                <div class="alert alert-danger fs-5 py-2">Not Paid</div>
              }
            </div>
          </div>

          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-body p-4">
              <h4 class="fw-bold mb-3 border-bottom pb-3">Order Items</h4>
              <div class="list-group list-group-flush">
                @for (item of order.orderItems; track item._id) {
                  <div class="list-group-item px-0 py-3">
                    <div class="row align-items-center">
                      <div class="col-md-2 mb-2 mb-md-0">
                        <img [src]="item.image" [alt]="item.name" class="img-fluid rounded bg-light p-1" style="max-height: 50px; object-fit: contain;">
                      </div>
                      <div class="col-md-6 mb-2 mb-md-0">
                        <a [routerLink]="['/product', item.product]" class="text-decoration-none fw-bold text-dark">{{ item.name }}</a>
                      </div>
                      <div class="col-md-4 text-md-end text-muted fw-bold">
                        {{ item.qty }} x $\{{ item.price.toFixed(2) }} = $\{{ (item.qty * item.price).toFixed(2) }}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="card shadow-sm border-0 rounded-4 sticky-top" style="top: 100px;">
            <div class="card-body p-4">
              <h4 class="fw-bold mb-4 border-bottom pb-3 text-center text-md-start">Order Summary</h4>
              <div class="d-flex justify-content-between mb-3 fs-5">
                <span class="text-muted">Items</span>
                <span class="fw-bold">$\{{ calculateItemsPrice().toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-3 fs-5">
                <span class="text-muted">Shipping</span>
                <span class="fw-bold">$\{{ order.shippingPrice.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-3 fs-5">
                <span class="text-muted">Tax</span>
                <span class="fw-bold">$\{{ order.taxPrice.toFixed(2) }}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between mb-4 fs-4 text-primary fw-bold">
                <span>Total</span>
                <span>$\{{ order.totalPrice.toFixed(2) }}</span>
              </div>
              
              @if (!order.isPaid) {
                <div class="w-100 mb-3">
                  <!-- Payment Gateway like PayPal/Stripe buttons would go here -->
                  <button class="btn btn-warning w-100 rounded-pill p-3 fw-bold fs-5 shadow-sm" (click)="mockPayment()">
                    Pay Now (Mock)
                  </button>
                </div>
              }

              @if (user()?.isAdmin && order.isPaid && !order.isDelivered) {
                <button class="btn btn-dark w-100 rounded-pill p-3 fw-bold shadow-sm" (click)="deliverOrder()">
                  Mark As Delivered
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class OrderDetailsComponent implements OnInit {
    route = inject(ActivatedRoute);
    orderService = inject(OrderService);
    authService = inject(AuthService);

    orderId = '';
    order: any;
    loading = true;
    error = '';
    user = this.authService.currentUser;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.orderId = id;
                this.loadOrder();
            }
        });
    }

    loadOrder() {
        this.orderService.getOrderDetails(this.orderId).subscribe({
            next: (order) => {
                this.order = order;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Order not found';
                this.loading = false;
            }
        });
    }

    calculateItemsPrice() {
        return this.order.orderItems.reduce((acc: any, item: any) => acc + item.price * item.qty, 0);
    }

    mockPayment() {
        // In actual Stripe implementation this calls a backend create-checkout-session
        const paymentResult = {
            id: 'mock_tx_' + Date.now(),
            status: 'COMPLETED',
            update_time: new Date().toISOString(),
            payer: { email_address: this.order.user.email }
        };

        this.orderService.payOrder(this.orderId, paymentResult).subscribe({
            next: () => this.loadOrder(),
            error: (err) => this.error = err.error?.message
        });
    }

    deliverOrder() {
        // Note: Requires admin service method `deliverOrder(orderId)` to be implemented
        alert('Called Deliver Order. This requires admin privileges.');
    }
}
