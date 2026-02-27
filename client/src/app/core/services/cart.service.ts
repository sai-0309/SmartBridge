import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.service';

export interface CartItem extends Product {
    qty: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartItems = signal<CartItem[]>([]);

    shippingAddress = signal<any>({});
    paymentMethod = signal<string>('Stripe');

    cartSubtotal = computed(() => {
        return this.cartItems().reduce((acc, item) => acc + item.price * item.qty, 0);
    });

    constructor() {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            this.cartItems.set(JSON.parse(storedCart));
        }
    }

    addToCart(product: Product, qty: number) {
        const currentCart = this.cartItems();
        const existItem = currentCart.find((x) => x._id === product._id);

        let updatedCart;
        if (existItem) {
            updatedCart = currentCart.map((x) =>
                x._id === existItem._id ? { ...product, qty } : x
            );
        } else {
            updatedCart = [...currentCart, { ...product, qty }];
        }

        this.cartItems.set(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }

    removeFromCart(id: string) {
        const updatedCart = this.cartItems().filter((x) => x._id !== id);
        this.cartItems.set(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }

    saveShippingAddress(data: any) {
        this.shippingAddress.set(data);
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    }

    savePaymentMethod(data: string) {
        this.paymentMethod.set(data);
        localStorage.setItem('paymentMethod', JSON.stringify(data));
    }

    clearCart() {
        this.cartItems.set([]);
        localStorage.removeItem('cartItems');
    }
}
