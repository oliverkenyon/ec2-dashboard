import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss']
})
export class InstancesComponent implements OnInit {
  // TODO: define type
  instances;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getInstances().subscribe((data => {
      console.log(data);
      this.instances = data;
    }))
  }

}
