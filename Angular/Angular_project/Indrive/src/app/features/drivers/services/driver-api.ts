import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DriverApi {
  private apiUrl = 'https://6a17e0de1878294b597bfcac.mockapi.io/moviqo/drivers';
  constructor(private http: HttpClient) {}


  getDrivers() {
    return this.http.get(this.apiUrl);
  }

}
