import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Iattendance } from 'src/app/shared/models/attendance';
import { UtilityService } from 'src/app/shared/services/utility.service';


@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss']
})
export class AttendanceFormComponent implements OnInit {
  signupform!: FormGroup

  // isfullday:boolean=false
  employeename: Array<any> = []
  filteredOptions!: Observable<string[]>;
  workHours !: number
  constructor(private _employeeService: EmployeeService, private attendanceservice: AttendanceService,
    private _dialogref: MatDialogRef<AttendanceFormComponent>
    , private _snackbar: SnackbarService, @Inject(MAT_DIALOG_DATA) public obj: Iattendance,
    public _utilityService: UtilityService
  ) {

  }

  ngOnInit(): void {

    this.employeename = this._employeeService.getAllEmployeeNamesFromLocalStorage()

    this.signupform = new FormGroup({
      EmployeeName: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      inTime: new FormControl(null, [Validators.required]),
      outTime: new FormControl(null, [Validators.required]),
      isfullday: new FormControl(null)
    })
    this.signupform.controls['isfullday'].disable()


    this.signupform.controls['outTime'].valueChanges.subscribe(res => {
      if (this.signupform.controls['inTime'].valid && this.signupform.controls['outTime'].valid) {
        this.workHours = this._utilityService.getemployeWorkTime(this.signupform.controls['inTime'].value, this.signupform.controls['outTime'].value)
        console.log(this.workHours);
        if (this.workHours >= 8) {
          this.signupform.controls['isfullday'].enable()
          this.signupform.controls['isfullday'].patchValue(true)

        } else {
          this.signupform.controls['isfullday'].disable()
          this.signupform.controls['isfullday'].patchValue(false)


        }
      }

    })
    this.signupform.controls['inTime'].valueChanges.subscribe(res => {
      if (this.signupform.controls['inTime'].valid && this.signupform.controls['outTime'].valid) {
        this.workHours = this._utilityService.getemployeWorkTime(this.signupform.controls['inTime'].value, this.signupform.controls['outTime'].value)
        console.log(this.workHours);
        if (this.workHours >= 8) {
          this.signupform.controls['isfullday'].enable()
          this.signupform.controls['isfullday'].patchValue(true)

        } else {
          this.signupform.controls['isfullday'].disable()
          this.signupform.controls['isfullday'].patchValue(false)


        }
      }

    })

    //auto complete
    this.filteredOptions = this.signupform.controls['EmployeeName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    if (this.obj) {
      console.log(this.obj);

      this.signupform.patchValue(this.obj)
    }
  }

  attendanceformsubmit() {
    if (this.signupform.valid) {
      if (this.obj) {
        this.attendanceservice.updateattendanceInfo(this.obj.id!, this.signupform.value)
          .subscribe((res) => {
            console.log(res);
            this._snackbar.snackBarOpen("employee was Updated sucessfully!!!")
            this._dialogref.close(true)

          })
      } else {
        this.attendanceservice.createattendanceinfo(this.signupform.value)
          .subscribe((res) => {
            console.log(res);
            this._snackbar.snackBarOpen("userdata was added sucessfully!!!")
            this._dialogref.close(true)

          })
      }
    }

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.employeename.filter(option => option.toLowerCase().includes(filterValue));
  }



}
