import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { InstancesComponent } from './instances.component';

describe('InstancesComponent', () => {
  let component: InstancesComponent;
  let fixture: ComponentFixture<InstancesComponent>;

  let httpTestingController: HttpTestingController;

  const mockInstance = {
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancesComponent ],
      imports: [ 
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesComponent);
    httpTestingController = TestBed.get(HttpTestingController);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should request list of instances on load with no search', async(() => {

    expect(component).toBeTruthy();

    const mockApiResponse = [
      mockInstance,
      mockInstance
    ];

    const request = httpTestingController.expectOne(
      (req: HttpRequest<any>) => req.urlWithParams.includes("/instances?searchValue="));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      request.flush(mockApiResponse);
      httpTestingController.verify();
    })
  }));

  it('should send search requests back to API', async(() => {
    const mockApiResponse = [
      mockInstance,
      mockInstance
    ];

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.search("test")
      const matches = httpTestingController.match(
        (req: HttpRequest<any>) => req.urlWithParams.includes('/instances?searchValue=test'));

      expect(matches.length).toEqual(1);
    });
  }));

});
