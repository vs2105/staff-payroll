import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SaleryRecordService } from 'src/app/shared/services/salery-record.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-salery-record-form',
  templateUrl: './salery-record-form.component.html',
  styleUrls: ['./salery-record-form.component.scss']
})
export class SaleryRecordFormComponent implements OnInit {
  filteredOptions!: Observable<string[]>;
  employeename: Array<any> = []
  submitsaleryform!: FormGroup
  constructor(private _saleryrecordservice: SaleryRecordService,
    private snackbarservice: SnackbarService,
    private dialogref: MatDialogRef<SaleryRecordFormComponent>,
    private _EmployeeService: EmployeeService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.employeename = this._EmployeeService.getAllEmployeeNamesFromLocalStorage()

    this.submitsaleryform = new FormGroup({
      EmpName: new FormControl(null, [Validators.required]),
      saleryDate: new FormControl(null, [Validators.required]),
      totalAdvance: new FormControl(null, [Validators.required]),
      presentDays: new FormControl(null, [Validators.required]),
      saleryAmount: new FormControl(null, [Validators.required])
    })

    // this.getemployeename()

    if (this.data) {
      this.submitsaleryform.patchValue(this.data)
      // console.log(this.data);
    }

    this.filteredOptions = this.submitsaleryform.controls['EmpName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }





  saleryformsubmit() {
    if (this.submitsaleryform.valid) {
      if (this.data) {

        this._saleryrecordservice.updateemployee(this.data.id, this.submitsaleryform.value)
          .subscribe((res) => {

            console.log(res, 'updated');

            this.snackbarservice.snackBarOpen("salery record Details Updted  sucessfully")
            this.dialogref.close(true)

          },
          )
      } else {
        this._saleryrecordservice.addsaleryDetails(this.submitsaleryform.value)
          .subscribe((res) => {

            console.log(res);

            this.snackbarservice.snackBarOpen("salery record Details added sucessfully")
            this.dialogref.close(true)

          },
          )
      }

    }
  }

  onformsubmit() {

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.employeename.filter(option => option.toLowerCase().includes(filterValue));
  }

}
