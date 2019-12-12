import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { InstancesComponent } from './instances.component';
import { ApiService } from '../api.service';

const mockInstance = {
  name: 'mock instance name',
  id: 'mock instance id',
  ips: {public: 'public ip', private: ['private ip']}
};

describe('InstancesComponent', () => {
  let component: InstancesComponent;
  let fixture: ComponentFixture<InstancesComponent>;
  let mockApi: ApiService;

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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesComponent);
    component = fixture.componentInstance;

    mockApi = TestBed.get(ApiService);
    spyOn(mockApi, 'getInstances').and.returnValue(of([mockInstance]))

    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should request list of instances on load with no search', async(() => {
    fixture.whenStable().then(() => {
      expect(mockApi.getInstances).toHaveBeenCalledWith("");
    })
  }));

  it('should send search requests back to API', async(() => {
    fixture.whenStable().then(() => {
      component.search("test")
      expect(mockApi.getInstances).toHaveBeenCalledWith("test");
    });
  }));

  it('should render data from API', async(() => {
    fixture.whenStable().then(() => {
      const rows = fixture.debugElement.nativeElement.querySelectorAll('.mat-row');
      expect(rows.length).toBe(1);

      const rowContent = rows[0].textContent;
      expect(rowContent).toContain('mock instance name');
      expect(rowContent).toContain('mock instance id');
      expect(rowContent).toContain('public ip');
      expect(rowContent).toContain('private ip');
    });
  }));

});
