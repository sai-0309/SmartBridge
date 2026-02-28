import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fk-navbar">
      <div class="container d-flex align-items-center justify-content-between py-2">
        
        <!-- Brand / Logo -->
        <a class="navbar-brand text-white fw-bold fs-4 fst-italic me-lg-4 d-flex align-items-center" routerLink="/">
          <i class="fa fa-cart-plus me-1 text-warning"></i>
          <span style="letter-spacing: -0.5px;">ShopSmart</span>
        </a>

        <!-- Search Bar (Desktop) -->
        <div class="flex-grow-1 mx-3 mx-lg-5 position-relative d-none d-md-block">
          <input type="text" class="form-control px-3 py-2 border-0 shadow-none" 
                 placeholder="Search for products, brands and more" 
                 style="background-color: var(--fk-bg); border-radius: 2px; font-size: 14px;">
          <button class="btn position-absolute end-0 top-0 bottom-0 text-primary px-3" 
                  style="background: transparent; border: none; color: var(--fk-blue) !important;">
            <i class="fa fa-search"></i>
          </button>
        </div>

        <!-- Right Side Nav -->
        <div class="d-flex align-items-center gap-3 gap-lg-4">
          
          <!-- User / Auth -->
          @if (user()) {
            <div class="dropdown">
              <a class="text-white fw-bold d-flex align-items-center cursor-pointer text-decoration-none" href="#" data-bs-toggle="dropdown">
                {{ user().name }} <i class="fa fa-angle-down ms-1" style="font-size: 12px;"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2" style="border-radius: 2px;">
                <li><a class="dropdown-item py-2" routerLink="/profile"><i class="fa fa-user-circle me-3 text-primary"></i> My Profile</a></li>
                @if (user().isAdmin) {
                  <li><hr class="dropdown-divider"></li>
                  <li><h6 class="dropdown-header text-muted text-uppercase" style="font-size: 11px;">Admin Features</h6></li>
                  <li><a class="dropdown-item py-2" routerLink="/admin/userlist"><i class="fa fa-users me-3 text-primary"></i> Users</a></li>
                  <li><a class="dropdown-item py-2" routerLink="/admin/productlist"><i class="fa fa-box me-3 text-primary"></i> Products</a></li>
                  <li><a class="dropdown-item py-2" routerLink="/admin/orderlist"><i class="fa fa-list me-3 text-primary"></i> Orders</a></li>
                }
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item py-2" href="javascript:void(0)" (click)="logout()"><i class="fa fa-power-off me-3 text-danger"></i> Logout</a></li>
              </ul>
            </div>
          } @else {
            <a routerLink="/login" class="btn bg-white rounded-1 shadow-sm fw-bold login-btn">
              Login
            </a>
          }

          <!-- Cart -->
          <a class="text-white fw-bold d-flex align-items-center text-decoration-none" routerLink="/cart">
            <i class="fa fa-shopping-cart me-2"></i>
            <span>Cart</span>
            @if (cartItemCount() > 0) {
              <span class="badge bg-warning text-dark ms-1 rounded-1 px-2">{{ cartItemCount() }}</span>
            }
          </a>

        </div>
      </div>
      
      <!-- Mobile Search Bar (Only visible on small screens below navigation) -->
      <div class="bg-primary p-2 d-md-none" style="background-color: var(--fk-blue) !important;">
        <div class="container position-relative">
          <input type="text" class="form-control px-3 py-2 border-0 shadow-none" 
                 placeholder="Search for products..." 
                 style="background-color: var(--fk-bg); border-radius: 2px; font-size: 14px;">
           <button class="btn position-absolute end-0 top-0 bottom-0 px-3" 
                  style="background: transparent; border: none; color: var(--fk-blue) !important; padding-right: 25px !important;">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .fk-navbar {
      background-color: var(--fk-blue);
      position: sticky;
      top: 0;
      z-index: 1020;
    }
    .login-btn {
      color: var(--fk-blue);
      padding: 0.35rem 2.4rem;
      font-size: 15px;
      transition: all 0.2s;
    }
    .login-btn:hover {
      background-color: #f8f8f8 !important;
    }
    .dropdown-item {
      font-size: 14px;
      font-weight: 500;
      color: var(--fk-text);
    }
    .dropdown-item:hover {
      background-color: var(--fk-bg);
    }
    .cursor-pointer {
      cursor: pointer;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);

  user = this.authService.currentUser;

  get cartItemCount() {
    return () => this.cartService.cartItems().reduce((acc, item) => acc + item.qty, 0);
  }

  logout() {
    this.authService.logout();
  }
}
