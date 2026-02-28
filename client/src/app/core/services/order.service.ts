import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = environment.apiUrl + '/orders';

    constructor(private http: HttpClient) { }

    createOrder(order: any) {
        return this.http.post<any>(this.apiUrl, order);
    }

    getOrderDetails(id: string) {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    payOrder(orderId: string, paymentResult: any) {
        return this.http.put<any>(`${this.apiUrl}/${orderId}/pay`, paymentResult);
    }

    getMyOrders() {
        return this.http.get<any[]>(`${this.apiUrl}/myorders`);
    }
}
