import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  displayedColumns: string[] = ['name', 'address', 'phone_number', 'createdAt','edit','delete'];
  dataSource: any;
  searchp: any;
  response: any
  searchform = new FormGroup({
    search: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  constructor(private commonservice: CommonService,private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.commonservice.getData(this.searchform.value.search).subscribe((res) => {
      this.response = res
      this.dataSource = this.response.data;
    })
  }
  convertDate(date: any) {
    var d = new Date(date)
    return (d.getFullYear() + "-" +(d.getMonth() + 1) + "-" + d.getDate());
  }
  editRecord(data:any)
  {
    this.router.navigate(['/',data]);
  }
  deleteRecord(data:any)
  {

    const index = this.dataSource.indexOf(data.id);
if (index > -1) {
  this.dataSource.splice(index, 1);
  console.log( this.dataSource);
}
  console.log( this.dataSource);
  }
  submit(value: any) {
    this.commonservice.getData(value).subscribe((res) => {
      this.response = res
      this.dataSource = this.response.data;
    })
  }

}