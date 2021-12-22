import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/commomservice';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    mno: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  });

  ngOnInit(): void {
  }

  constructor(private commonservice: CommonService, readonly snackBar: MatSnackBar) { }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.commonservice.addData(this.form.value).subscribe((res) => {
        this.snackBar.open("Record Saved !!", "", { duration: 3000 });
        this.form.reset();

        for (let name in this.form.controls) {
          this.form.controls[name].setErrors(null);
        }
        for (let address in this.form.controls) {
          this.form.controls[address].setErrors(null);
        }
        for (let mno in this.form.controls) {
          this.form.controls[mno].setErrors(null);
        }
      })
    }
  }
}

