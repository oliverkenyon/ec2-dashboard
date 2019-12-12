import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO: Make into configurable, environment specific setting
const API_BASE = 'http://localhost:3000/api/v1'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getInstances(searchValue: String) {
    return this.httpClient.get(`${API_BASE}/instances?searchValue=${searchValue}`);
  }
}