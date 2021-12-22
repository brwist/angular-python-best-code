import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) { }
  apiURL = environment.appURl;
  getData(searchValue: any) {
    return this.http.get(this.apiURL + 'getUsers?search=' + searchValue);
  }
  addData(user: any) {
    var formData = new FormData();
    formData.append("name", user.name);
    formData.append("address", user.address);
    formData.append("phone_number", user.mno);
    return this.http.post(this.apiURL + 'addUser', formData);
  }
}

