import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Iadvance } from 'src/app/shared/models/advancePay';
import { AdvancePayService } from 'src/app/shared/services/advance-pay.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-advance-form',
  templateUrl: './advance-form.component.html',
  styleUrls: ['./advance-form.component.scss']
})
export class AdvanceFormComponent implements OnInit {
  filteredOptions!: Observable<string[]>;   // autocomplete
  employeeNameArray: any[] = []
  advanceForm!: FormGroup
  todaysDate!: Date
  advanceObj!: Iadvance
  constructor(
    private _employeeService: EmployeeService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AdvanceFormComponent>,
    private _advancePayService: AdvancePayService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private Obj: Iadvance
  ) { }

  ngOnInit(): void {
    this.createAdvanceForm()
    this.employeeNameArray = this._employeeService.getAllEmployeeNamesFromLocalStorage()
    this.todaysDate = new Date()

    if (this.Obj) {
      this.advanceObj = this.Obj
      this.advanceForm.patchValue(this.Obj)
    }

    // autocomplete
    this.filteredOptions = this.advanceForm.controls['empName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    )
  }

  createAdvanceForm(): FormGroup {
    return this.advanceForm = this._fb.group({
      empName: [null, Validators.required],
      contact: [null, Validators.required],
      advanceDate: [null, Validators.required],
      amount: [null, Validators.required],
      reason: [null, Validators.required],
    })
  }



  // autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employeeNameArray.filter(option => option.toLowerCase().includes(filterValue));
  }

  advanceFormHandler() {
    if (!this.advanceForm.invalid) {
      if (!this.advanceObj) {
        console.log(this.advanceForm.value);
        this._advancePayService.addAdvancePay(this.advanceForm.value)
          .subscribe(res => {
            console.log(res);
            this._dialogRef.close(true)
            this._snackbarService.snackBarOpen(`${this.advanceForm.get('empName')?.value}'s Adavance Pay Request is Added`)
          })
      } else {
        console.log(this.advanceObj.id);

        this._advancePayService.updateAdvance(this.advanceObj.id!, this.advanceForm.value)
          .subscribe(res => {
            console.log(res);
            this._dialogRef.close(true)
            this._snackbarService.snackBarOpen(`${this.advanceForm.get('empName')?.value}'s Adavance Pay Updated `)
          })
      }
    }

  }
}
