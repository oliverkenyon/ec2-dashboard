import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss']
})
export class InstancesComponent implements OnInit {
  // TODO: define type
  instances;
  dataSource;

  constructor(private apiService: ApiService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.apiService.getInstances().subscribe((data => {
      console.log(data);
      this.instances = data
      this.dataSource = new MatTableDataSource(this.instances);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }));

    
  }

}
