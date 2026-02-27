import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [FormsModule, RouterLink, DatePipe],
    template: `
    <div class="row mt-4">
      <div class="col-md-3 mb-4">
        <div class="card shadow-sm border-0 rounded-4 sticky-top" style="top: 100px;">
          <div class="card-body p-4">
            <h3 class="fw-bold mb-4 border-bottom pb-2">User Profile</h3>
            
            @if (message) {
              <div class="alert alert-success">{{ message }}</div>
            }

            <form (ngSubmit)="updateProfile()">
              <div class="mb-3">
                <label for="name" class="form-label fw-bold">Name</label>
                <input type="text" class="form-control p-3 bg-light border-0 rounded-3" id="name" [(ngModel)]="name" name="name">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label fw-bold">Email</label>
                <input type="email" class="form-control p-3 bg-light border-0 rounded-3" id="email" [(ngModel)]="email" name="email">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label fw-bold">Password</label>
                <input type="password" class="form-control p-3 bg-light border-0 rounded-3" id="password" [(ngModel)]="password" name="password" placeholder="Leave blank to keep same">
              </div>
              <button type="submit" class="btn btn-primary w-100 rounded-pill fw-bold p-3">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
      
      <div class="col-md-9">
        <h3 class="fw-bold mb-4">My Orders</h3>
        @if (loadingOrders) {
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status"></div>
          </div>
        } @else if (ordersError) {
          <div class="alert alert-danger">{{ ordersError }}</div>
        } @else if (orders.length === 0) {
          <div class="alert alert-info">You do not have any orders.</div>
        } @else {
          <div class="table-responsive shadow-sm rounded-4 bg-white p-3">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">DATE</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">PAID</th>
                  <th scope="col">DELIVERED</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                @for (order of orders; track order._id) {
                  <tr>
                    <td class="text-muted fw-bold">{{ order._id.substring(0, 8) }}...</td>
                    <td>{{ order.createdAt | date:'shortDate' }}</td>
                    <td>$\{{ order.totalPrice.toFixed(2) }}</td>
                    <td>
                      @if (order.isPaid) {
                        <span class="badge bg-success py-2 px-3 rounded-pill">{{ order.paidAt | date:'shortDate' }}</span>
                      } @else {
                        <span class="badge bg-danger py-2 px-3 rounded-pill">Not Paid</span>
                      }
                    </td>
                    <td>
                      @if (order.isDelivered) {
                        <span class="badge bg-success py-2 px-3 rounded-pill">{{ order.deliveredAt | date:'shortDate' }}</span>
                      } @else {
                        <span class="badge bg-danger py-2 px-3 rounded-pill">Not Delivered</span>
                      }
                    </td>
                    <td>
                      <a [routerLink]="['/order', order._id]" class="btn btn-sm btn-outline-dark rounded-pill px-3 fw-bold">Details</a>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
    authService = inject(AuthService);
    orderService = inject(OrderService);

    name = '';
    email = '';
    password = '';
    message = '';

    orders: any[] = [];
    loadingOrders = true;
    ordersError = '';

    ngOnInit() {
        const user = this.authService.currentUser();
        if (user) {
            this.name = user.name;
            this.email = user.email;
        }

        this.orderService.getMyOrders().subscribe({
            next: (orders) => {
                this.orders = orders;
                this.loadingOrders = false;
            },
            error: (err) => {
                this.ordersError = err.error?.message || 'Failed to load orders';
                this.loadingOrders = false;
            }
        });
    }

    updateProfile() {
        // Typically involves calling user service to update
        this.message = 'Profile Updated (Mock)';
    }
}
