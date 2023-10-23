import { Component, OnInit } from '@angular/core';
import { HeadingService } from '../../services/heading.service';
import { EmployeeService } from '../../services/employee.service';
import { LeaveService } from '../../services/leave.service';
import { Observable, map } from 'rxjs';
import { SaleryRecordService } from '../../services/salery-record.service';
import { AdvancePayService } from '../../services/advance-pay.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalEmployee!: number
  totalLeaves$!: Observable<number>
  totalSalaryCount$!: Observable<number>
  totalAdvanceCount$!: Observable<number>
  constructor(
    private _headingService: HeadingService,
    private _employeService: EmployeeService,
    private _leaveService: LeaveService,
    private _salaryService: SaleryRecordService,
    private _advanceService: AdvancePayService
  ) { }

  ngOnInit(): void {
    this._headingService.heading$.next('Dashboard')
    this._employeService.getAllEmployeeNames()
      .subscribe(res => {
        this.totalEmployee = res.length
        localStorage.setItem('employName', JSON.stringify(res))
      })

    this.totalLeaves$ = this._leaveService.getAllLeaves()
      .pipe(map(res => res.length))



    this.totalSalaryCount$ = this._salaryService.getsalerydetails()
      .pipe(map(res => res.length))


    this.totalAdvanceCount$ = this._advanceService.getAllAdvance()
      .pipe(map(res => res.length))

  }

}
