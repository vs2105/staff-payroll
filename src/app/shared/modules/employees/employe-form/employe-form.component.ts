import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Iemployee } from 'src/app/shared/models/employee';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-employe-form',
  templateUrl: './employe-form.component.html',
  styleUrls: ['./employe-form.component.scss']
})
export class EmployeFormComponent implements OnInit, OnDestroy {

  employeForm!: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _matDialogRef: MatDialogRef<EmployeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public obj: Iemployee,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createEmployeeForm()

    if (this.obj) {
      // console.log(this.obj);
      this.employeForm.patchValue(this.obj)
    }
  }

  createEmployeeForm(): FormGroup {
    return this.employeForm = this._fb.group({
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      contact: [null, Validators.required],
      email: [null, Validators.required],
      currentAddress: [null, Validators.required],
      permentAddress: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      pincode: [null, Validators.required],
      bankName: [null, Validators.required],
      ifscCode: [null, Validators.required],
      salary: [null, Validators.required],
    })
  }


  flag: boolean = false
  sameAddres() {
    this.flag = !this.flag
    if (this.flag) {
      this.employeForm.controls['permentAddress'].patchValue(this.employeForm.controls['currentAddress'].value)
    } else {
      this.employeForm.controls['permentAddress'].reset()
    }

  }

  employeeHandler() {

    if (!this.obj) {
      if (this.employeForm.valid) {
        this._employeeService.addNewEmployee(this.employeForm.value)
          .subscribe(res => {
            // console.log(res);
            this._snackbarService.snackBarOpen(`${this.employeForm.get('fname')?.value} Employee is Added Successfully...!!!`)
            this._matDialogRef.close(true)

            this._employeeService.getAllEmployeeNames().subscribe(res => {
              // console.log(res);
              localStorage.setItem('employName', JSON.stringify(res))
            })
          })
      }
    } else {
      if (this.employeForm.valid) {
        console.log(this.employeForm.value, 'obj is avi');
        this._employeeService.updateEmployee(this.obj.id!, this.employeForm.value)
          .subscribe(res => {
            // console.log(res, 'res');
            this._snackbarService.snackBarOpen(`Employee ${this.employeForm.get('fname')?.value} Information Updated...!!!`)


            this._matDialogRef.close(true)
          })
      }

    }

  }



  ngOnDestroy(): void {
  }
}
