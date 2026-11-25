import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DriverApi {
  private apiUrl = 'https://6b06468a57fa1297bb5596b3.mockapi.io/api/pratice/Drivers';
  constructor(private http: HttpClient) {}


  getDrivers() {
    return this.http.get(this.apiUrl);
  }

}
