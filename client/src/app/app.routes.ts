import { Routes } from '@angular/router';
import { HomeComponent } from './features/shop/home/home.component';
import { ProductDetailComponent } from './features/shop/product-detail/product-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ShippingComponent } from './features/checkout/shipping/shipping.component';
import { PaymentComponent } from './features/checkout/payment/payment.component';
import { PlaceOrderComponent } from './features/checkout/placeorder/place-order.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { OrderDetailsComponent } from './features/order/order-details/order-details.component';
import { ProductListComponent } from './features/admin/productlist/productlist.component';
import { OrderListComponent } from './features/admin/orderlist/orderlist.component';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Protected Routes
    { path: 'shipping', component: ShippingComponent, canActivate: [authGuard] },
    { path: 'payment', component: PaymentComponent, canActivate: [authGuard] },
    { path: 'placeorder', component: PlaceOrderComponent, canActivate: [authGuard] },
    { path: 'order/:id', component: OrderDetailsComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

    // Admin Routes
    { path: 'admin/productlist', component: ProductListComponent, canActivate: [authGuard, adminGuard] },
    { path: 'admin/orderlist', component: OrderListComponent, canActivate: [authGuard, adminGuard] },

    { path: '**', redirectTo: '' }
];
