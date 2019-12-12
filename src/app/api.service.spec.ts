import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

describe('ApiService', () => {

  let httpTestingController: HttpTestingController;
  let mockApiResponse = []

  beforeEach((() => {
    TestBed.configureTestingModule({ imports: [ HttpClientTestingModule ] });
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('getInstances should send request to API with empty search', async() => {
    const service: ApiService = TestBed.get(ApiService);
   
    service.getInstances("").subscribe(data => {
      const request = httpTestingController.expectOne(
        (req: HttpRequest<any>) => req.urlWithParams.includes("/instances?searchValue="));
      request.flush(mockApiResponse);
      httpTestingController.verify();
    })
  });

  it('getInstances should send request to API with search term specified', async() => {
    const service: ApiService = TestBed.get(ApiService);
   
    service.getInstances("search term").subscribe(data => {
      const request = httpTestingController.expectOne(
        (req: HttpRequest<any>) => req.urlWithParams.includes("/instances?searchValue=search+term"));
      request.flush(mockApiResponse);
      httpTestingController.verify();
    })
  });
});
