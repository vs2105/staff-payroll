import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ileave } from 'src/app/shared/models/leave';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { LeaveService } from 'src/app/shared/services/leave.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
  leaveForm!: FormGroup
  employeeNameArray: any[] = []
  todaysDate!: Date
  leaveObj!: Ileave
  filteredOptions!: Observable<string[]>;   // autocomplete
  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _leaveService: LeaveService,
    private _dialogRef: MatDialogRef<LeaveFormComponent>,
    @Inject(MAT_DIALOG_DATA) private obj: Ileave,
    private _dialog: MatDialog,
    private _snackBarService: SnackbarService
  ) { }
  ngOnInit(): void {
    this.createLeaveForm()
    this.todaysDate = new Date()
    this.employeeNameArray = this._employeeService.getAllEmployeeNamesFromLocalStorage()

    if (this.obj) {
      this.leaveObj = this.obj
      this.leaveForm.patchValue(this.leaveObj)

    }
    // autocomplete
    this.filteredOptions = this.leaveForm.controls['empName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    )


  }
  // autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employeeNameArray.filter(option => option.toLowerCase().includes(filterValue));
  }


  createLeaveForm(): FormGroup {
    return this.leaveForm = this._fb.group({
      empName: [null, Validators.required],
      contact: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      reason: [null, Validators.required]
    })
  }

  onLeaveFormSubmit() {
    if (this.leaveForm.valid) {
      if (!this.leaveObj) {
        // console.log(this.leaveForm.value);
        this._leaveService.createLeave(this.leaveForm.value)
          .subscribe(res => {
            // console.log(res);
            this._dialogRef.close(true)
            this._snackBarService.snackBarOpen(`${this.leaveForm.get('empName')?.value}'s  leave Added Successfully...!!!`)
          })
      } else {
        this._leaveService.updateLeave(this.leaveForm.value, this.leaveObj.id!)
          .subscribe(res => {
            // console.log(res);
            this._dialogRef.close(true)
            this._snackBarService.snackBarOpen(`${this.leaveForm.get('empName')?.value}'s leave Update Successfully...!!!`)

          })
      }
    }

  }


}
