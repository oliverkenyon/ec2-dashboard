import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// This is left hard-coded for now due to time constraints, but I would implement it 
// using something like this: https://stackoverflow.com/a/40287063
// As it should be configurable per environment
const API_BASE = 'http://localhost:3000/api/v1'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getInstances(searchValue: String) {
    console.log("Get instances called with: " + searchValue)

    return this.httpClient.get(`${API_BASE}/instances?searchValue=${searchValue}`);
  }
}