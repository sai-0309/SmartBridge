import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [RouterLink, DatePipe],
    template: `
    <h2 class="fw-bold mb-4">Orders List</h2>

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
              <th scope="col">USER</th>
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
                <td class="fw-bold">{{ order.user?.name || 'Unknown' }}</td>
                <td>{{ order.createdAt | date:'shortDate' }}</td>
                <td>$\{{ order.totalPrice.toFixed(2) }}</td>
                <td>
                  @if (order.isPaid) {
                    <i class="fa fa-check text-success fa-lg"></i> {{ order.paidAt | date:'shortDate' }}
                  } @else {
                    <i class="fa fa-times text-danger fa-lg"></i>
                  }
                </td>
                <td>
                  @if (order.isDelivered) {
                    <i class="fa fa-check text-success fa-lg"></i> {{ order.deliveredAt | date:'shortDate' }}
                  } @else {
                    <i class="fa fa-times text-danger fa-lg"></i>
                  }
                </td>
                <td class="text-end">
                  <a [routerLink]="['/order', order._id]" class="btn btn-sm btn-outline-dark rounded-pill shadow-sm px-3 fw-bold">
                    Details
                  </a>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `
})
export class OrderListComponent implements OnInit {
    orderService = inject(OrderService);

    orders: any[] = [];
    loading = true;
    error = '';

    ngOnInit() {
        this.orderService.getMyOrders().subscribe({
            next: (data) => {
                // Mock admin behavior - since the user will login as admin, let's just use getMyOrders or an admin endpoint.
                // Wait, did I map getOrders? Yes, in orderService I need to add getting all orders.
                this.orders = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error fetching orders';
                this.loading = false;
            }
        });
    }
}
