import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AttendanceFormComponent } from '../../attendance-form/attendance-form.component';
import { HeadingService } from 'src/app/shared/services/heading.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { Iattendance } from 'src/app/shared/models/attendance';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteConfirmationComponent } from '../../../material/delete-confirmation/delete-confirmation.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UtilityService } from 'src/app/shared/services/utility.service';




@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.scss']
})
export class AttendanceTableComponent implements OnInit {

  displayedColumns: string[] = ['EmployeeName', 'date', 'inTime', 'outTime', 'hours', 'isfullday', 'edit', 'delete'];
  dataSource!: MatTableDataSource<Iattendance>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //  Arrayattendance:Iattendance[]=[] 

  constructor(public _dialog: MatDialog, private _headingservice: HeadingService,
    private _attendanceservice: AttendanceService, private _snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getemployee()

  }

  openattendanceForm() {

    const dialogref = this._dialog.open(AttendanceFormComponent)
    dialogref.afterClosed().subscribe((res) => {
      if (res) {
        this.getemployee()
      }
    })
  }
  inoutArray: Array<any> = []
  getemployee() {
    this._headingservice.heading$.next('Attendance')
    this._attendanceservice.getattendanceinfo().subscribe((res) => {
      console.log(res);

      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  oneditattendanceform(obj: Iattendance) {
    console.log(obj);

    let dialogconfig = new MatDialogConfig
    dialogconfig.data = obj
    this._dialog.open(AttendanceFormComponent, dialogconfig)
      .afterClosed().subscribe((res) => {
        console.log(res);

        if (res) {
          this.getemployee()
        }
      })
  }

  ondeleteuser(obj: Iattendance) {
    // console.log(obj);
    
    this._dialog.open(DeleteConfirmationComponent).afterClosed()
      .subscribe((res) => {
        if (res) {
          this._attendanceservice.deleteinfo(obj.id!)
            .subscribe((res) => {
              this.getemployee()
              this._snackbarService.snackBarOpen(`${obj.EmployeeName} deleted sucessfully`)

            }
            )
        }
      })


  }

}
