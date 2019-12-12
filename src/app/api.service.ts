import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getInstances(searchValue: String) {
    return this.httpClient.get(`${environment.api_base}/instances?searchValue=${searchValue}`);
  }
}