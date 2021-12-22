import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/commomservice';


export interface PeriodicElement {
  name: string;
  address: string;
  phone_number: number;
  createdAt: Date;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  displayedColumns: string[] = ['name', 'address', 'phone_number', 'createdAt'];
  dataSource: any;
  searchp: any;
  response: any
  searchform = new FormGroup({
    search: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  constructor(private commonservice: CommonService) {

  }
  ngOnInit() {
    this.commonservice.getData(this.searchform.value.search).subscribe((res) => {
      this.response = res
      this.dataSource = this.response.data;
    })
  }
  convertDate(date: Date) {
    const d = new Date(date)
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
  submit(value: any) {
    this.commonservice.getData(value).subscribe((res) => {
      this.response = res
      this.dataSource = this.response.data;
    })
  }

}