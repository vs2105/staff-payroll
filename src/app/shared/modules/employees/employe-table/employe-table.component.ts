import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeFormComponent } from '../employe-form/employe-form.component';
import { HeadingService } from 'src/app/shared/services/heading.service';
import { Iemployee, UserData } from 'src/app/shared/models/employee';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DeleteConfirmationComponent } from '../../material/delete-confirmation/delete-confirmation.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employe-table',
  templateUrl: './employe-table.component.html',
  styleUrls: ['./employe-table.component.scss']
})
export class EmployeTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'name',
    'contact',
    'email',
    'city',
    'state',
    'pincode',
    'bankName',
    'salary',
    'action1',
    'action2'
  ];
  dataSource!: MatTableDataSource<Iemployee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _headingService: HeadingService,
    private _employeeService: EmployeeService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this._headingService.heading$.next('Employee')
    this.getAllEmp()


  }


  getAllEmp() {
    return this._employeeService.getAllEmployee()
      .subscribe(res => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      })
  }

  openEmpForm() {
    let dialogConfig = new MatDialogConfig
    dialogConfig.autoFocus = true
    dialogConfig.disableClose = true
    this._dialog.open(EmployeFormComponent, dialogConfig).afterClosed()
      .subscribe(res => {

        if (res) {
          this.getAllEmp()
        }
      })
  }

  onEdit(obj: Iemployee) {
    // console.log(obj);
    let dialogConfig = new MatDialogConfig
    dialogConfig.data = obj
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this._dialog.open(EmployeFormComponent, dialogConfig).afterClosed()
      .subscribe(res => {

        if (res) {
          this.getAllEmp()


        }
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEmployeRemove(obj: Iemployee) {
    if (obj) {
      this._dialog.open(DeleteConfirmationComponent).afterClosed().subscribe(res => {
        if (res) {
          this._employeeService.deleteEmployee(obj.id!)
            .subscribe(res => {
              console.log(res);
              this.getAllEmp()

              this._employeeService.getAllEmployeeNames().subscribe(res => {
                // console.log(res);
                localStorage.setItem('employName', JSON.stringify(res))
              })
              this._snackbarService.snackBarOpen(`${obj.fname} ${obj.lname} Employee is Removed...!!!`)
            })
        }
      })
    }
  }

  ngOnDestroy(): void {

  }
}



