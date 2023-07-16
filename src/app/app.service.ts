import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface Product {
  image: string;
  title: string;
  text: string;
  price: number;
  grams: number;
}

@Injectable({
  providedIn: 'root'
})

export class AppService {
  sendData(data: any) {
    return this.http.post('https://testologia.site/burgers-order', data)
  }

  getProductsData() {
    return this.http.get('https://testologia.site/burgers-data?extra=black')
  }
  constructor(private http: HttpClient) {}	
}
