import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Product {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: string;
    price: number;
    countInStock: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = environment.apiUrl + '/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }
}
