import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss']
})
export class InstancesComponent implements OnInit, AfterViewInit {

  instances: any;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('search', {static: true}) searchField: ElementRef;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const emptySearchValue = "";
    this.apiService.getInstances(emptySearchValue).subscribe((data =>
      this.updateDataSource(data)
    ));
  }

  ngAfterViewInit() {
    // Use of debounce is because search triggers API call
    const keyUp$ = fromEvent(this.searchField.nativeElement, 'keyup');
    keyUp$
    .pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(1000)
    )
    .subscribe((searchValue: string) => { this.search(searchValue)});
  }

  search(searchValue: string) {
    // Requirement from PDF is look-ahead search. I'm interpreting the requirement as 
    // meaning we pass the search term back to the API and it returns only the data that matches,
    // saving bandwidth and time. Normally I would double check this with PO, but due to time constraints
    // I've chosen this implementation option

    // To filter on client side instead:
    // this.dataSource.filter = searchValue.trim().toLowerCase();

    this.apiService.getInstances(searchValue).subscribe((data => 
      this.updateDataSource(data)))
  }

  updateDataSource(data: any) {
    console.log(data);

    this.instances = data
    this.dataSource = new MatTableDataSource(this.instances);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
